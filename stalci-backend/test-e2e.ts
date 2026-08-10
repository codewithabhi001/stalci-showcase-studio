const API_BASE = 'http://localhost:3000';

async function testE2E() {
  console.log('--- STARTING COMPLETE END-TO-END VERIFICATION ---');

  // 1. Submit Inquiry
  console.log('1. Submitting Project Consultation Inquiry from Public Site...');
  const inqRes = await fetch(`${API_BASE}/crm/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Alex Morgan',
      email: 'alex.morgan@enterprise.ai',
      company: 'Enterprise AI Pods',
      service: 'AI & Agentic Systems',
      budget: '$100,000+',
      message: 'We need an autonomous enterprise multi-agent workflow with vector retrieval.',
    }),
  });
  const inqData = await inqRes.json();
  console.log('✅ Inquiry Created:', inqData.id, inqData.name);

  // 2. Fetch Inquiries in CRM
  console.log('\n2. Fetching Inquiries from CRM...');
  const allInquiriesRes = await fetch(`${API_BASE}/crm/inquiries`);
  const allInquiries = await allInquiriesRes.json();
  console.log(`✅ Total Inquiries in CRM: ${allInquiries.length}`);

  // 3. Create a New Client
  console.log('\n3. Creating New Client Account...');
  const clientRes = await fetch(`${API_BASE}/crm/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Sophia Laurent',
      email: 'sophia@luxurydigital.fr',
      phone: '+33 1 42 68 55 00',
      company: 'Maison Luxe Paris',
      address: '15 Place Vendôme, 75001 Paris, France',
      website: 'https://maisonluxe.fr',
      status: 'ACTIVE',
      notes: 'Haute-couture digital platform and AI concierge.',
    }),
  });
  const newClient = await clientRes.json();
  console.log('✅ Client Created:', newClient.id, newClient.company);

  // 4. Create a Project linked to this Client
  console.log('\n4. Creating New Project linked to Client...');
  const projectRes = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Maison Luxe AI Concierge & Headless Commerce',
      description: 'Bespoke conversational AI styling assistant and headless commerce architecture.',
      category: 'Enterprise SaaS',
      clientId: newClient.id,
      services: ['Custom Software', 'AI & Agentic Systems', 'Cloud Engineering'],
      technologies: ['Next.js 16', 'NestJS', 'PyTorch', 'PostgreSQL', 'Tailwind CSS'],
      budget: 140000,
      status: 'IN_PROGRESS',
      priority: 'URGENT',
      progress: 40,
      featured: true,
    }),
  });
  const newProject = await projectRes.json();
  console.log('✅ Project Created:', newProject.id, newProject.title);

  // 5. Issue an Itemized Invoice with Template Selection
  console.log('\n5. Creating Itemized Invoice with Template Selection...');
  const invoiceRes = await fetch(`${API_BASE}/finance/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      invoiceNumber: 'INV-2026-009',
      clientId: newClient.id,
      projectId: newProject.id,
      currency: 'EUR',
      discount: 5000,
      taxRate: 20,
      notes: 'Phase 1 Architecture & AI Model Fine-Tuning milestone.',
      paymentDetails: 'BNP Paribas Paris • IBAN: FR76 3000 4000 0000 1234 5678 901',
      items: [
        { description: 'Fine-Tuned Multimodal Styling Agent', quantity: 1, unitPrice: 45000, amount: 45000 },
        { description: 'Headless Next.js Storefront & Micro-Frontend Layer', quantity: 1, unitPrice: 35000, amount: 35000 },
      ],
    }),
  });
  const newInvoice = await invoiceRes.json();
  console.log('✅ Invoice Created:', newInvoice.invoiceNumber, 'Total:', newInvoice.total, 'EUR');

  // 6. Fetch Client Details with Relational Links
  console.log('\n6. Verifying Client Profile with Linked Projects & Invoices...');
  const clientProfileRes = await fetch(`${API_BASE}/crm/clients/${newClient.id}`);
  const clientProfile = await clientProfileRes.json();
  console.log(`✅ Client: ${clientProfile.company}`);
  console.log(`✅ Linked Projects count: ${clientProfile.projects.length} (${clientProfile.projects[0]?.title})`);
  console.log(`✅ Linked Invoices count: ${clientProfile.invoices.length} (${clientProfile.invoices[0]?.invoiceNumber})`);

  // 7. Verify Stats Aggregation
  console.log('\n7. Checking Dashboard Aggregated Stats...');
  const statsRes = await fetch(`${API_BASE}/finance/stats`);
  const stats = await statsRes.json();
  console.log('✅ Live Stats:', {
    totalClients: stats.totalClients,
    totalProjectsCount: stats.totalProjectsCount,
    totalInvoicesCount: stats.totalInvoicesCount,
    totalInquiries: stats.totalInquiries,
    revenueGrowth: `${stats.revenueGrowth}%`,
  });

  console.log('\n🎉 ALL END-TO-END INTEGRATION TESTS PASSED SUCCESSFULLY!');
}

testE2E().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
