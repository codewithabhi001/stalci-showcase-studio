import * as http from 'http';

const API_BASE = process.env.API_BASE || 'http://localhost:4001';

interface TestResult {
  module: string;
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];
let accessToken = '';
let refreshToken = '';

function logPass(moduleName: string, testName: string) {
  console.log(`  ✅ [${moduleName}] ${testName}`);
  results.push({ module: moduleName, name: testName, passed: true });
}

function logFail(moduleName: string, testName: string, error: any) {
  const errMsg = error?.message || String(error);
  console.error(`  ❌ [${moduleName}] ${testName} - ${errMsg}`);
  results.push({ module: moduleName, name: testName, passed: false, error: errMsg });
}

async function apiRequest<T = any>(
  path: string,
  method: string = 'GET',
  body?: any,
  token?: string
): Promise<{ status: number; data: T }> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any;
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  return { status: res.status, data };
}

async function runAdminApiTests() {
  console.log('\n===============================================================');
  console.log('🚀 STALCI ADMIN APIs COMPREHENSIVE AUTOMATED TEST SUITE');
  console.log(`Targeting Backend Base URL: ${API_BASE}`);
  console.log('===============================================================\n');

  // -----------------------------------------------------------------
  // 1. AUTHENTICATION MODULE TESTS
  // -----------------------------------------------------------------
  console.log('🔐 --- Testing Auth Module APIs ---');

  // 1.1 Invalid Login
  try {
    const { status } = await apiRequest('/auth/login', 'POST', {
      email: 'admin@stalci.com',
      password: 'wrong-password',
    });
    if (status === 401) {
      logPass('Auth', 'Reject invalid password login (401)');
    } else {
      throw new Error(`Expected 401, got ${status}`);
    }
  } catch (err) {
    logFail('Auth', 'Reject invalid password login', err);
  }

  // 1.2 Valid Admin Login
  try {
    const { status, data } = await apiRequest('/auth/login', 'POST', {
      email: 'admin@stalci.com',
      password: 'stalci2026',
    });
    if (status === 200 || status === 201) {
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      if (!accessToken || !refreshToken) {
        throw new Error('Tokens missing from login response');
      }
      logPass('Auth', `Admin Login successful (Got access & refresh tokens)`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Auth', 'Admin Login', err);
  }

  // 1.3 Verify /auth/me with Bearer Token
  try {
    const { status, data } = await apiRequest('/auth/me', 'GET', undefined, accessToken);
    if (status === 200 && data.email === 'admin@stalci.com') {
      logPass('Auth', `Get Me profile verified (${data.name})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Auth', 'Get Me profile', err);
  }

  // 1.4 Token Refresh
  try {
    const { status, data } = await apiRequest('/auth/refresh', 'POST', { refreshToken });
    if (status === 200 || status === 201) {
      accessToken = data.accessToken;
      if (data.refreshToken) refreshToken = data.refreshToken;
      logPass('Auth', 'Token refresh successful');
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Auth', 'Token refresh', err);
  }

  // -----------------------------------------------------------------
  // 2. ADMIN PROFILE & NOTIFICATIONS MODULE TESTS
  // -----------------------------------------------------------------
  console.log('\n👤 --- Testing Admin Module APIs ---');

  try {
    const { status, data } = await apiRequest('/admin/profile', 'GET', undefined, accessToken);
    if (status === 200 && data.email) {
      logPass('Admin', `Get Admin Profile (${data.email})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Admin', 'Get Admin Profile', err);
  }

  try {
    const { status, data } = await apiRequest('/admin/profile', 'PUT', { name: 'Stalci Master Admin' }, accessToken);
    if (status === 200 && data.name === 'Stalci Master Admin') {
      logPass('Admin', 'Update Admin Profile Name');
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Admin', 'Update Admin Profile Name', err);
  }

  try {
    const { status, data } = await apiRequest('/admin/notifications', 'GET', undefined, accessToken);
    if (status === 200 && Array.isArray(data)) {
      logPass('Admin', `Get Notifications (Total: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Admin', 'Get Notifications', err);
  }

  try {
    const { status, data } = await apiRequest('/admin/notifications/read', 'PUT', undefined, accessToken);
    if (status === 200 && (data.success || data.count !== undefined)) {
      logPass('Admin', 'Mark Notifications as Read');
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Admin', 'Mark Notifications as Read', err);
  }

  // -----------------------------------------------------------------
  // 3. CMS MODULE ADMIN TESTS (Services, Tech, Products, Industries, Blogs, Pages, Testimonials, Config)
  // -----------------------------------------------------------------
  console.log('\n📰 --- Testing CMS Module APIs ---');

  // Site Config
  try {
    const { status, data } = await apiRequest('/cms/config', 'GET', undefined, accessToken);
    if (status === 200 && Array.isArray(data)) {
      logPass('CMS', `Get Site Configs list (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get Site Configs list', err);
  }

  try {
    const { status, data } = await apiRequest('/cms/config/map', 'GET');
    if (status === 200 && typeof data === 'object') {
      logPass('CMS', 'Get Site Config Map');
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get Site Config Map', err);
  }

  try {
    const { status, data } = await apiRequest('/cms/config/testKey', 'PUT', { value: 'testValue' }, accessToken);
    if (status === 200 && data.key === 'testKey') {
      logPass('CMS', 'Update/Upsert Site Config Key');
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Update/Upsert Site Config Key', err);
  }

  // Services CRUD
  let createdServiceId = 0;
  const testServiceSlug = `test-service-${Date.now()}`;
  try {
    const { status, data } = await apiRequest('/cms/services', 'POST', {
      slug: testServiceSlug,
      name: 'Autonomous Agentic Systems',
      description: 'Custom AI agent orchestration service.',
      category: 'AI Services',
      price: '$10,000 / Sprint',
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdServiceId = data.id;
      logPass('CMS', `Create Service (ID: ${data.id}, Name: ${data.name})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Create Service', err);
  }

  try {
    const { status, data } = await apiRequest('/cms/services', 'GET');
    if (status === 200 && Array.isArray(data)) {
      logPass('CMS', `Get All Services (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get All Services', err);
  }

  try {
    const { status, data } = await apiRequest(`/cms/services/${testServiceSlug}`, 'GET');
    if (status === 200 && data.slug === testServiceSlug) {
      logPass('CMS', `Get Service by Slug (${testServiceSlug})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get Service by Slug', err);
  }

  if (createdServiceId) {
    try {
      const { status, data } = await apiRequest(`/cms/services/${createdServiceId}`, 'PUT', {
        name: 'Autonomous Agentic Systems & LLMs',
      }, accessToken);
      if (status === 200 && data.name.includes('LLMs')) {
        logPass('CMS', 'Update Service');
      } else {
        throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      logFail('CMS', 'Update Service', err);
    }

    try {
      const { status } = await apiRequest(`/cms/services/${createdServiceId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('CMS', 'Delete Service');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('CMS', 'Delete Service', err);
    }
  }

  // Technologies CRUD
  let createdTechId = 0;
  try {
    const { status, data } = await apiRequest('/cms/technologies', 'POST', {
      name: 'PyTorch 2.4',
      category: 'AI & Neural',
      icon: 'pytorch',
      proficiency: 95,
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdTechId = data.id;
      logPass('CMS', `Create Technology (ID: ${data.id})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Create Technology', err);
  }

  try {
    const { status, data } = await apiRequest('/cms/technologies', 'GET');
    if (status === 200 && Array.isArray(data)) {
      logPass('CMS', `Get Technologies (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get Technologies', err);
  }

  if (createdTechId) {
    try {
      const { status } = await apiRequest(`/cms/technologies/${createdTechId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('CMS', 'Delete Technology');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('CMS', 'Delete Technology', err);
    }
  }

  // Industries CRUD
  let createdIndustryId = 0;
  const testIndustrySlug = `ind-${Date.now()}`;
  try {
    const { status, data } = await apiRequest('/cms/industries', 'POST', {
      slug: testIndustrySlug,
      name: 'Quantum Computing & Telemetry',
      description: 'Quantum algorithms & sub-millisecond simulation pipelines.',
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdIndustryId = data.id;
      logPass('CMS', `Create Industry (ID: ${data.id})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Create Industry', err);
  }

  try {
    const { status, data } = await apiRequest('/cms/industries', 'GET');
    if (status === 200 && Array.isArray(data)) {
      logPass('CMS', `Get Industries (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get Industries', err);
  }

  if (createdIndustryId) {
    try {
      const { status } = await apiRequest(`/cms/industries/${createdIndustryId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('CMS', 'Delete Industry');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('CMS', 'Delete Industry', err);
    }
  }

  // Products CRUD
  let createdProductId = 0;
  const testProductSlug = `product-${Date.now()}`;
  try {
    const { status, data } = await apiRequest('/cms/products', 'POST', {
      slug: testProductSlug,
      name: 'Stalci AI Vector Mesh',
      description: 'High performance vector search accelerator engine.',
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdProductId = data.id;
      logPass('CMS', `Create Product (ID: ${data.id})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Create Product', err);
  }

  try {
    const { status, data } = await apiRequest('/cms/products', 'GET');
    if (status === 200 && Array.isArray(data)) {
      logPass('CMS', `Get Products (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get Products', err);
  }

  if (createdProductId) {
    try {
      const { status } = await apiRequest(`/cms/products/${createdProductId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('CMS', 'Delete Product');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('CMS', 'Delete Product', err);
    }
  }

  // Testimonials CRUD
  let createdTestimonialId = 0;
  try {
    const { status, data } = await apiRequest('/cms/testimonials', 'POST', {
      clientName: 'Lord Raymond Vance',
      quote: 'STALCI engineered our sovereign AI infrastructure in 4 weeks.',
      company: 'Vance Quantum Corp',
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdTestimonialId = data.id;
      logPass('CMS', `Create Testimonial (ID: ${data.id})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Create Testimonial', err);
  }

  try {
    const { status, data } = await apiRequest('/cms/testimonials', 'GET');
    if (status === 200 && Array.isArray(data)) {
      logPass('CMS', `Get Testimonials (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CMS', 'Get Testimonials', err);
  }

  if (createdTestimonialId) {
    try {
      const { status } = await apiRequest(`/cms/testimonials/${createdTestimonialId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('CMS', 'Delete Testimonial');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('CMS', 'Delete Testimonial', err);
    }
  }

  // -----------------------------------------------------------------
  // 4. CRM & CAREERS MODULE TESTS (Clients, Jobs, Inquiries, Feedback)
  // -----------------------------------------------------------------
  console.log('\n💼 --- Testing CRM & Careers Module APIs ---');

  // Clients
  let createdClientId = 0;
  try {
    const { status, data } = await apiRequest('/crm/clients', 'POST', {
      name: 'Victoria Cross',
      email: `victoria-${Date.now()}@apexcloud.io`,
      company: 'Apex Cloud Systems',
      status: 'ACTIVE',
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdClientId = data.id;
      logPass('CRM', `Create Client (ID: ${data.id}, Company: ${data.company})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CRM', 'Create Client', err);
  }

  try {
    const { status, data } = await apiRequest('/crm/clients', 'GET', undefined, accessToken);
    if (status === 200 && Array.isArray(data)) {
      logPass('CRM', `Get Clients List (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CRM', 'Get Clients List', err);
  }

  if (createdClientId) {
    try {
      const { status, data } = await apiRequest(`/crm/clients/${createdClientId}`, 'GET', undefined, accessToken);
      if (status === 200 && data.id === createdClientId) {
        logPass('CRM', `Get Client by ID (${createdClientId})`);
      } else {
        throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      logFail('CRM', 'Get Client by ID', err);
    }
  }

  // Inquiries
  let createdInquiryId = 0;
  try {
    const { status, data } = await apiRequest('/crm/inquiries', 'POST', {
      name: 'Alexander Pierce',
      email: 'alex.pierce@multicloud.io',
      company: 'MultiCloud Labs',
      service: 'Cloud Platform Engineering',
      message: 'Need autonomous Kubernetes cluster autoscaling setup.',
    });
    if ((status === 200 || status === 201) && data.id) {
      createdInquiryId = data.id;
      logPass('CRM', `Submit Public Inquiry (ID: ${data.id})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CRM', 'Submit Public Inquiry', err);
  }

  try {
    const { status, data } = await apiRequest('/crm/inquiries', 'GET', undefined, accessToken);
    if (status === 200 && Array.isArray(data)) {
      logPass('CRM', `Get CRM Inquiries (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CRM', 'Get CRM Inquiries', err);
  }

  // Feedback
  try {
    const { status, data } = await apiRequest('/crm/feedback', 'POST', {
      name: 'Enterprise Reviewer',
      rating: 5,
      comments: 'Phenomenal SRE velocity and 100% SLA adherence.',
    });
    if ((status === 200 || status === 201) && data.id) {
      logPass('CRM', `Submit Feedback (ID: ${data.id})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('CRM', 'Submit Feedback', err);
  }

  // -----------------------------------------------------------------
  // 5. PROJECTS MODULE TESTS
  // -----------------------------------------------------------------
  console.log('\n🚀 --- Testing Projects Module APIs ---');

  let createdProjectId = 0;
  const testProjectSlug = `proj-${Date.now()}`;
  try {
    const { status, data } = await apiRequest('/projects', 'POST', {
      title: 'Aegis Quantum Firewall & eBPF Engine',
      slug: testProjectSlug,
      description: 'Kernel-level zero-trust eBPF security mesh for cloud EKS clusters.',
      category: 'Cyber Security',
      budget: 180000,
      status: 'IN_PROGRESS',
      featured: true,
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdProjectId = data.id;
      logPass('Projects', `Create Project (ID: ${data.id}, Title: ${data.title})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Projects', 'Create Project', err);
  }

  try {
    const { status, data } = await apiRequest('/projects', 'GET');
    if (status === 200 && Array.isArray(data)) {
      logPass('Projects', `Get Public Projects (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Projects', 'Get Public Projects', err);
  }

  try {
    const { status, data } = await apiRequest('/projects/featured', 'GET');
    if (status === 200 && Array.isArray(data)) {
      logPass('Projects', `Get Featured Projects (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Projects', 'Get Featured Projects', err);
  }

  try {
    const { status, data } = await apiRequest(`/projects/slug/${testProjectSlug}`, 'GET');
    if (status === 200 && data.slug === testProjectSlug) {
      logPass('Projects', `Get Project by Slug (${testProjectSlug})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Projects', 'Get Project by Slug', err);
  }

  if (createdProjectId) {
    try {
      const { status } = await apiRequest(`/projects/${createdProjectId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('Projects', 'Delete Project');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('Projects', 'Delete Project', err);
    }
  }

  // -----------------------------------------------------------------
  // 6. FINANCE MODULE TESTS (Stats, Invoices, Templates)
  // -----------------------------------------------------------------
  console.log('\n💳 --- Testing Finance Module APIs ---');

  try {
    const { status, data } = await apiRequest('/finance/stats', 'GET');
    if (status === 200 && data.totalClients !== undefined) {
      logPass('Finance', `Get Dashboard Live Stats (Clients: ${data.totalClients}, Projects: ${data.totalProjectsCount})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Finance', 'Get Dashboard Live Stats', err);
  }

  let createdTemplateId = 0;
  const testTemplateSlug = `template-${Date.now()}`;
  try {
    const { status, data } = await apiRequest('/finance/templates', 'POST', {
      name: 'Luxury Black Gold Invoice',
      slug: testTemplateSlug,
      layoutType: 'PREMIUM',
      primaryColor: '#D89B5B',
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdTemplateId = data.id;
      logPass('Finance', `Create Invoice Template (ID: ${data.id})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Finance', 'Create Invoice Template', err);
  }

  try {
    const { status, data } = await apiRequest('/finance/templates', 'GET', undefined, accessToken);
    if (status === 200 && Array.isArray(data)) {
      logPass('Finance', `Get Invoice Templates (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Finance', 'Get Invoice Templates', err);
  }

  if (createdTemplateId) {
    try {
      const { status } = await apiRequest(`/finance/templates/${createdTemplateId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('Finance', 'Delete Invoice Template');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('Finance', 'Delete Invoice Template', err);
    }
  }

  let createdInvoiceId = 0;
  if (createdClientId) {
    const invNum = `INV-TEST-${Date.now()}`;
    try {
      const { status, data } = await apiRequest('/finance/invoices', 'POST', {
        invoiceNumber: invNum,
        clientId: createdClientId,
        dueDate: new Date().toISOString(),
        currency: 'USD',
        status: 'PENDING',
        items: [
          { description: 'Autonomous Agentic Systems Architecture', quantity: 1, unitPrice: 45000, amount: 45000 },
        ],
      }, accessToken);
      if ((status === 200 || status === 201) && data.id) {
        createdInvoiceId = data.id;
        logPass('Finance', `Create Invoice (ID: ${data.id}, Total: $${data.total})`);
      } else {
        throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      logFail('Finance', 'Create Invoice', err);
    }

    if (createdInvoiceId) {
      try {
        const { status, data } = await apiRequest(`/finance/invoices/${createdInvoiceId}/status`, 'PATCH', {
          status: 'PAID',
        }, accessToken);
        if (status === 200 && data.status === 'PAID') {
          logPass('Finance', 'Update Invoice Status to PAID');
        } else {
          throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
        }
      } catch (err) {
        logFail('Finance', 'Update Invoice Status', err);
      }

      try {
        const { status } = await apiRequest(`/finance/invoices/${createdInvoiceId}`, 'DELETE', undefined, accessToken);
        if (status === 200) {
          logPass('Finance', 'Delete Invoice');
        } else {
          throw new Error(`Status ${status}`);
        }
      } catch (err) {
        logFail('Finance', 'Delete Invoice', err);
      }
    }
  }

  // Cleanup Client if created
  if (createdClientId) {
    try {
      await apiRequest(`/crm/clients/${createdClientId}`, 'DELETE', undefined, accessToken);
    } catch {
      // ignore cleanup errors
    }
  }

  // -----------------------------------------------------------------
  // 7. HR MODULE TESTS (Dashboard Analytics, Departments, Employees, Candidates)
  // -----------------------------------------------------------------
  console.log('\n👥 --- Testing HR Module APIs ---');

  try {
    const { status, data } = await apiRequest('/hr/dashboard/analytics', 'GET', undefined, accessToken);
    if (status === 200 && data.totalEmployees !== undefined) {
      logPass('HR', `Get HR Dashboard Analytics (Total Employees: ${data.totalEmployees})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('HR', 'Get HR Dashboard Analytics', err);
  }

  let createdDepartmentId = 0;
  const deptCode = `DEP-${Date.now()}`;
  try {
    const { status, data } = await apiRequest('/hr/departments', 'POST', {
      name: `Quantum Systems ${Date.now()}`,
      code: deptCode,
      description: 'Quantum research & high-throughput compute division',
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdDepartmentId = data.id;
      logPass('HR', `Create Department (ID: ${data.id}, Code: ${data.code})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('HR', 'Create Department', err);
  }

  try {
    const { status, data } = await apiRequest('/hr/departments', 'GET', undefined, accessToken);
    if (status === 200 && Array.isArray(data)) {
      logPass('HR', `Get Departments List (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('HR', 'Get Departments List', err);
  }

  let createdEmployeeId = 0;
  const empCode = `ST-TEST-${Date.now()}`;
  const empEmail = `emp-${Date.now()}@stalci.com`;
  try {
    const { status, data } = await apiRequest('/hr/employees', 'POST', {
      employeeCode: empCode,
      name: 'Julian Vance',
      email: empEmail,
      designation: 'Senior Quantum Engineer',
      departmentId: createdDepartmentId || undefined,
      employmentType: 'Full-time',
      status: 'ACTIVE',
      salaryCtc: 160000,
    }, accessToken);
    if ((status === 200 || status === 201) && data.id) {
      createdEmployeeId = data.id;
      logPass('HR', `Create Employee (ID: ${data.id}, Code: ${data.employeeCode})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('HR', 'Create Employee', err);
  }

  try {
    const { status, data } = await apiRequest('/hr/employees', 'GET', undefined, accessToken);
    if (status === 200 && Array.isArray(data)) {
      logPass('HR', `Get Employees List (Count: ${data.length})`);
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('HR', 'Get Employees List', err);
  }

  if (createdEmployeeId) {
    try {
      const { status } = await apiRequest(`/hr/employees/${createdEmployeeId}`, 'DELETE', undefined, accessToken);
      if (status === 200) {
        logPass('HR', 'Delete Employee');
      } else {
        throw new Error(`Status ${status}`);
      }
    } catch (err) {
      logFail('HR', 'Delete Employee', err);
    }
  }

  if (createdDepartmentId) {
    try {
      await apiRequest(`/hr/departments/${createdDepartmentId}`, 'DELETE', undefined, accessToken);
    } catch {
      // ignore department cleanup
    }
  }

  // -----------------------------------------------------------------
  // 8. UPLOAD MODULE TESTS
  // -----------------------------------------------------------------
  console.log('\n📁 --- Testing Upload Module APIs ---');

  try {
    const { status, data } = await apiRequest('/upload/mock', 'POST', { filename: 'architecture-spec.pdf' });
    if ((status === 200 || status === 201) && data.success) {
      logPass('Upload', 'Mock File Upload Service');
    } else {
      throw new Error(`Status ${status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('Upload', 'Mock File Upload Service', err);
  }

  // -----------------------------------------------------------------
  // FINAL TEST REPORT SUMMARY
  // -----------------------------------------------------------------
  console.log('\n===============================================================');
  console.log('📊 FINAL STALCI API AUTOMATED TEST RESULTS SUMMARY');
  console.log('===============================================================');

  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log(`Total APIs Tested: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}\n`);

  if (failed > 0) {
    console.error('❌ Failed Tests Summary:');
    results
      .filter((r) => !r.passed)
      .forEach((r) => console.error(`  - [${r.module}] ${r.name}: ${r.error}`));
    process.exit(1);
  } else {
    console.log('🎉 ALL ADMIN & PUBLIC API INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
    process.exit(0);
  }
}

runAdminApiTests().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
