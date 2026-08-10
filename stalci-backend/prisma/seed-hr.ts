import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password123@localhost:5433/stalci_db?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function seedHRData() {
  console.log('Seeding Complete HR & Employee Management System...');

  // 1. Roles & Permissions
  const permissionsData = [
    { slug: 'employees.view', name: 'View Employees', category: 'Employees' },
    { slug: 'employees.create', name: 'Create Employee', category: 'Employees' },
    { slug: 'employees.edit', name: 'Edit Employee', category: 'Employees' },
    { slug: 'employees.delete', name: 'Delete Employee', category: 'Employees' },
    { slug: 'recruitment.view', name: 'View Recruitment', category: 'Recruitment' },
    { slug: 'recruitment.manage', name: 'Manage Recruitment', category: 'Recruitment' },
    { slug: 'offers.manage', name: 'Manage Offer Letters', category: 'Recruitment' },
    { slug: 'onboarding.manage', name: 'Manage Onboarding', category: 'Employees' },
    { slug: 'attendance.view', name: 'View Attendance', category: 'Attendance' },
    { slug: 'attendance.manage', name: 'Manage Attendance', category: 'Attendance' },
    { slug: 'leave.view', name: 'View Leaves', category: 'Attendance' },
    { slug: 'leave.approve', name: 'Approve Leaves', category: 'Attendance' },
    { slug: 'payroll.view', name: 'View Payroll', category: 'Payroll' },
    { slug: 'payroll.manage', name: 'Manage Payroll & Payslips', category: 'Payroll' },
    { slug: 'internships.manage', name: 'Manage Internships', category: 'Internships' },
    { slug: 'performance.manage', name: 'Manage Performance Reviews', category: 'Performance' },
    { slug: 'assets.manage', name: 'Manage Company Assets', category: 'Assets' },
    { slug: 'letters.manage', name: 'Manage HR Letter Templates', category: 'Letters' },
    { slug: 'exits.manage', name: 'Manage Exits & F&F Settlement', category: 'Exits' },
    { slug: 'rbac.manage', name: 'Manage Roles & Security', category: 'RBAC' },
  ];

  for (const perm of permissionsData) {
    await prisma.permission.upsert({
      where: { slug: perm.slug },
      update: { name: perm.name, category: perm.category },
      create: perm,
    });
  }

  const rolesData = [
    { name: 'SUPER_ADMIN', description: 'Full root access to all HR operations, security, RBAC, and executive financial data.' },
    { name: 'HR_ADMIN', description: 'Full operational access to employee lifecycle, recruitment, letters, and operations.' },
    { name: 'RECRUITER', description: 'Access to job openings, candidate pipeline, resumes, and interview scheduling.' },
    { name: 'HR_OPS', description: 'Manages employee profiles, onboarding, attendance, leave, assets, and documents.' },
    { name: 'PAYROLL_FINANCE', description: 'Manages salary structures, monthly payroll runs, payslips, and final settlement.' },
    { name: 'MANAGER', description: 'Manages assigned team members, leave approvals, and performance reviews.' },
    { name: 'EMPLOYEE', description: 'Self-service access to personal profile, attendance, leave requests, and payslips.' },
    { name: 'INTERN', description: 'Self-service access to internship details, project milestones, and certificate.' },
  ];

  for (const r of rolesData) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: r,
    });
  }

  // 2. Departments
  const deptData = [
    { name: 'Executive & Strategic Leadership', code: 'EXEC', description: 'Corporate governance and technology strategy.' },
    { name: 'Sovereign AI & Machine Learning', code: 'AI-ML', description: 'Architecting neural pipelines, agentic workflows, and fine-tuning clusters.' },
    { name: 'Cloud Infrastructure & SRE', code: 'SRE-OPS', description: 'Zero-trust multi-cloud platforms, Kubernetes orchestration, and eBPF.' },
    { name: 'Distributed Systems & Backend', code: 'ENG-BACKEND', description: 'High-throughput microservices, consensus engines in Go and Rust.' },
    { name: 'Product Engineering & Design', code: 'ENG-FE', description: 'Modern UI/UX design systems and enterprise React applications.' },
    { name: 'People Operations & HR', code: 'HR-OPS', description: 'Talent acquisition, onboarding, culture, and employee welfare.' },
    { name: 'Finance & Legal Operations', code: 'FIN-LEGAL', description: 'Corporate billing, compliance, tax, and master agreements.' },
  ];

  const depts: Record<string, any> = {};
  for (const d of deptData) {
    const created = await prisma.department.upsert({
      where: { code: d.code },
      update: { name: d.name, description: d.description },
      create: d,
    });
    depts[d.code] = created;
  }

  // 3. Employees
  const employeesData = [
    {
      employeeCode: 'ST-EMP-001',
      name: 'Abhishek Kumar',
      email: 'abhishek@stalci.com',
      personalEmail: 'abhishek.founder@gmail.com',
      phone: '+1 (415) 890-2101',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      departmentId: depts['EXEC'].id,
      designation: 'Founder & Managing Director',
      joiningDate: new Date('2023-01-15'),
      employmentType: 'Full-time',
      workLocation: 'San Francisco, CA',
      status: 'ACTIVE',
      salaryCtc: 320000,
      bankName: 'JPMorgan Chase Bank',
      bankAccount: '••••••••4892',
      ifscSwift: 'CHASUS33',
      emergencyContactName: 'Priya Sharma',
      emergencyContactPhone: '+1 (415) 890-9988',
      skills: JSON.stringify(['Enterprise Architecture', 'Distributed Systems', 'Sovereign AI', 'Go', 'Rust', 'Kubernetes']),
      notes: 'Company Founder and Principal Architect.',
      probationStatus: 'CONFIRMED',
    },
    {
      employeeCode: 'ST-EMP-002',
      name: 'Dr. Elena Rostova',
      email: 'elena.rostova@stalci.com',
      personalEmail: 'elena.rostova@mit.edu',
      phone: '+1 (415) 555-0192',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      departmentId: depts['AI-ML'].id,
      designation: 'Principal AI / ML Architect',
      joiningDate: new Date('2024-03-01'),
      employmentType: 'Full-time',
      workLocation: 'San Francisco, CA / Hybrid',
      status: 'ACTIVE',
      salaryCtc: 240000,
      bankName: 'Silicon Valley Bank',
      bankAccount: '••••••••7721',
      ifscSwift: 'SVBKUS6S',
      emergencyContactName: 'Mikhail Rostov',
      emergencyContactPhone: '+1 (415) 555-9921',
      skills: JSON.stringify(['PyTorch', 'vLLM', 'Ray', 'Triton', 'Distributed Training', 'Quantization']),
      notes: 'Leading sovereign LLM fine-tuning cluster architectures.',
      probationStatus: 'CONFIRMED',
    },
    {
      employeeCode: 'ST-EMP-003',
      name: 'Marcus Vance',
      email: 'marcus.vance@stalci.com',
      personalEmail: 'm.vance.dev@gmail.com',
      phone: '+44 20 7946 0912',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      departmentId: depts['SRE-OPS'].id,
      designation: 'Lead Cloud Platform & SRE Engineer',
      joiningDate: new Date('2024-06-15'),
      employmentType: 'Full-time',
      workLocation: 'London, UK / Remote',
      status: 'ACTIVE',
      salaryCtc: 195000,
      bankName: 'Barclays Bank UK',
      bankAccount: '••••••••3319',
      ifscSwift: 'BARCGB22',
      emergencyContactName: 'Sarah Vance',
      emergencyContactPhone: '+44 20 7946 9911',
      skills: JSON.stringify(['Kubernetes', 'Terraform', 'Cilium eBPF', 'Prometheus', 'Cloudflare', 'AWS']),
      notes: 'Oversees 99.99% multi-region cloud uptime and GitOps pipelines.',
      probationStatus: 'CONFIRMED',
    },
    {
      employeeCode: 'ST-EMP-004',
      name: 'Sophia Chen',
      email: 'sophia.chen@stalci.com',
      personalEmail: 'sophia.chen.cs@berkeley.edu',
      phone: '+1 (415) 555-8812',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      departmentId: depts['ENG-FE'].id,
      designation: 'Lead Full-Stack Product Engineer',
      joiningDate: new Date('2025-01-10'),
      employmentType: 'Full-time',
      workLocation: 'San Francisco, CA / Remote',
      status: 'ACTIVE',
      salaryCtc: 175000,
      bankName: 'Bank of America',
      bankAccount: '••••••••9014',
      ifscSwift: 'BOFAUS3N',
      emergencyContactName: 'Kevin Chen',
      emergencyContactPhone: '+1 (415) 555-3344',
      skills: JSON.stringify(['React 19', 'Next.js', 'TanStack', 'TypeScript', 'Tailwind CSS', 'WebGL']),
      notes: 'Owner of STALCI Showcase Studio frontend systems.',
      probationStatus: 'CONFIRMED',
    },
    {
      employeeCode: 'ST-EMP-005',
      name: 'David Miller',
      email: 'david.miller@stalci.com',
      personalEmail: 'david.miller.ops@gmail.com',
      phone: '+1 (415) 555-4421',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      departmentId: depts['HR-OPS'].id,
      designation: 'Senior HR Operations & People Manager',
      joiningDate: new Date('2025-02-01'),
      employmentType: 'Full-time',
      workLocation: 'San Francisco, CA',
      status: 'ACTIVE',
      salaryCtc: 140000,
      bankName: 'Wells Fargo',
      bankAccount: '••••••••1184',
      ifscSwift: 'WFBIUS6S',
      emergencyContactName: 'Emily Miller',
      emergencyContactPhone: '+1 (415) 555-1234',
      skills: JSON.stringify(['HR Operations', 'Talent Acquisition', 'Payroll', 'Compliance', 'Performance Mgmt']),
      notes: 'Oversees organizational growth and employee lifecycle.',
      probationStatus: 'CONFIRMED',
    },
    {
      employeeCode: 'ST-EMP-006',
      name: 'Aryan Sharma',
      email: 'aryan.sharma@stalci.com',
      personalEmail: 'aryan.sharma@stanford.edu',
      phone: '+1 (650) 555-0982',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      departmentId: depts['AI-ML'].id,
      designation: 'Sovereign AI Research Intern',
      joiningDate: new Date('2026-05-15'),
      employmentType: 'Intern',
      workLocation: 'San Francisco, CA / Hybrid',
      status: 'ACTIVE',
      salaryCtc: 48000,
      bankName: 'Chase Bank',
      bankAccount: '••••••••6620',
      ifscSwift: 'CHASUS33',
      emergencyContactName: 'Sunil Sharma',
      emergencyContactPhone: '+1 (650) 555-8811',
      skills: JSON.stringify(['Python', 'PyTorch', 'Transformers', 'CUDA', 'Data Filtering']),
      notes: 'Summer 2026 Research Internship focusing on efficient context window scaling.',
      probationStatus: 'PENDING',
      probationEndDate: new Date('2026-08-15'),
    },
  ];

  const emps: Record<string, any> = {};
  for (const emp of employeesData) {
    const created = await prisma.employee.upsert({
      where: { employeeCode: emp.employeeCode },
      update: emp,
      create: emp,
    });
    emps[emp.employeeCode] = created;
  }

  // Set Managers
  await prisma.employee.update({
    where: { id: emps['ST-EMP-002'].id },
    data: { managerId: emps['ST-EMP-001'].id },
  });
  await prisma.employee.update({
    where: { id: emps['ST-EMP-003'].id },
    data: { managerId: emps['ST-EMP-001'].id },
  });
  await prisma.employee.update({
    where: { id: emps['ST-EMP-004'].id },
    data: { managerId: emps['ST-EMP-001'].id },
  });
  await prisma.employee.update({
    where: { id: emps['ST-EMP-006'].id },
    data: { managerId: emps['ST-EMP-002'].id },
  });

  // 4. Candidates & Recruitment Pipeline
  const candidatesData = [
    {
      name: 'Alexander Wright',
      email: 'alex.wright@engineer.io',
      phone: '+1 (415) 777-1234',
      currentCompany: 'Databricks',
      experienceYrs: 6.5,
      skills: 'Go, Rust, Raft, Distributed Storage, RocksDB',
      stage: 'INTERVIEW_SCHEDULED',
      rating: 5,
      interviewDate: new Date('2026-08-14T10:00:00Z'),
      interviewer: 'Abhishek Kumar',
      notes: 'Strong knowledge of write-ahead logging and consensus algorithms.',
    },
    {
      name: 'Maya Lin',
      email: 'maya.lin@uxstudio.co',
      phone: '+1 (415) 777-5678',
      currentCompany: 'Stripe',
      experienceYrs: 5,
      skills: 'React, Next.js, Framer Motion, Design Systems, Figma',
      stage: 'OFFER_EXTENDED',
      rating: 5,
      interviewDate: new Date('2026-08-05T14:00:00Z'),
      interviewer: 'Sophia Chen',
      notes: 'Outstanding technical challenge submission. Offer extended for Lead Frontend Engineer.',
    },
    {
      name: 'Lucas Bernard',
      email: 'lucas.bernard@cloudscale.net',
      phone: '+33 6 12 34 56 78',
      currentCompany: 'OVHcloud',
      experienceYrs: 4,
      skills: 'Kubernetes, Cilium, eBPF, Terraform, Go',
      stage: 'SCREENING',
      rating: 4,
      notes: 'Reviewing background for European Cloud Infrastructure pod.',
    },
  ];

  for (const cand of candidatesData) {
    const existing = await prisma.candidate.findFirst({ where: { email: cand.email } });
    if (!existing) {
      await prisma.candidate.create({ data: cand });
    }
  }

  // 5. Offer Letter Example
  const mayaCand = await prisma.candidate.findFirst({ where: { email: 'maya.lin@uxstudio.co' } });
  if (mayaCand) {
    await prisma.offerLetter.upsert({
      where: { candidateId: mayaCand.id },
      update: {},
      create: {
        candidateId: mayaCand.id,
        candidateName: mayaCand.name,
        candidateEmail: mayaCand.email,
        designation: 'Senior Product Design Engineer',
        departmentName: 'Product Engineering & Design',
        salaryCtc: 185000,
        joiningDate: new Date('2026-09-01'),
        probationMonths: 3,
        workLocation: 'San Francisco, CA / Hybrid',
        status: 'SENT',
        sentAt: new Date(),
        terms: 'Standard Master Employment Agreement with comprehensive health, 401(k) matching, and annual equity grant.',
      },
    });
  }

  // 6. Onboarding Tasks for Employees
  const onboardingTemplateTasks = [
    { taskName: 'Submit Government ID & Address Proof', category: 'Documentation' },
    { taskName: 'Direct Deposit / Bank Account Verification', category: 'Finance' },
    { taskName: 'Sign Master Employment Agreement & NDA', category: 'Legal' },
    { taskName: 'Provision Enterprise MacBook Pro & YubiKey Hardware', category: 'IT & Hardware' },
    { taskName: 'Setup Google Workspace & GitHub Enterprise Accounts', category: 'IT & Hardware' },
    { taskName: 'Executive Welcome Orientation & Team Introduction', category: 'Orientation' },
    { taskName: 'Security Awareness & SOC 2 Compliance Briefing', category: 'Training' },
  ];

  for (const empCode of ['ST-EMP-004', 'ST-EMP-006']) {
    const emp = emps[empCode];
    if (emp) {
      for (const t of onboardingTemplateTasks) {
        const existing = await prisma.onboardingTask.findFirst({
          where: { employeeId: emp.id, taskName: t.taskName },
        });
        if (!existing) {
          await prisma.onboardingTask.create({
            data: {
              employeeId: emp.id,
              taskName: t.taskName,
              category: t.category,
              isCompleted: empCode === 'ST-EMP-004', // ST-EMP-004 completed all, intern has some pending
              completedAt: empCode === 'ST-EMP-004' ? new Date() : null,
            },
          });
        }
      }
    }
  }

  // 7. Attendance Records (Recent days)
  const today = new Date();
  for (const empCode of Object.keys(emps)) {
    const emp = emps[empCode];
    for (let d = 0; d < 5; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - d);
      date.setHours(0, 0, 0, 0);

      await prisma.attendanceRecord.upsert({
        where: {
          employeeId_date: {
            employeeId: emp.id,
            date: date,
          },
        },
        update: {},
        create: {
          employeeId: emp.id,
          date: date,
          status: d === 0 ? 'PRESENT' : d === 3 ? 'WFH' : 'PRESENT',
          checkIn: '09:05 AM',
          checkOut: '06:15 PM',
          notes: 'Standard office hours logged.',
        },
      });
    }
  }

  // 8. Leave Requests
  await prisma.leaveRequest.createMany({
    data: [
      {
        employeeId: emps['ST-EMP-003'].id,
        leaveType: 'EARNED',
        startDate: new Date('2026-08-20'),
        endDate: new Date('2026-08-24'),
        daysCount: 3,
        reason: 'Annual family vacation.',
        status: 'APPROVED',
        approvedBy: 'Abhishek Kumar',
        approvedAt: new Date(),
      },
      {
        employeeId: emps['ST-EMP-004'].id,
        leaveType: 'CASUAL',
        startDate: new Date('2026-08-18'),
        endDate: new Date('2026-08-18'),
        daysCount: 1,
        reason: 'Personal appointments.',
        status: 'PENDING',
      },
    ],
    skipDuplicates: true,
  });

  // 9. Payroll Records & Payslips (August 2026)
  for (const empCode of Object.keys(emps)) {
    const emp = emps[empCode];
    const monthlyGross = Math.round(emp.salaryCtc / 12);
    const basic = Math.round(monthlyGross * 0.5);
    const hra = Math.round(monthlyGross * 0.3);
    const allowances = monthlyGross - (basic + hra);
    const tax = Math.round(monthlyGross * 0.15);
    const netSalary = monthlyGross - tax;

    await prisma.payrollRecord.upsert({
      where: {
        employeeId_month_year: {
          employeeId: emp.id,
          month: 'August',
          year: 2026,
        },
      },
      update: {},
      create: {
        employeeId: emp.id,
        month: 'August',
        year: 2026,
        basicSalary: basic,
        hra: hra,
        allowances: allowances,
        bonus: empCode === 'ST-EMP-002' ? 5000 : 0,
        deductions: 0,
        taxDeductions: tax,
        netSalary: netSalary + (empCode === 'ST-EMP-002' ? 5000 : 0),
        status: 'PAID',
        paidAt: new Date('2026-08-01'),
        referenceNumber: `STALCI-PAY-202608-${emp.id}`,
      },
    });
  }

  // 10. Internship Details
  await prisma.internshipRecord.upsert({
    where: { employeeId: emps['ST-EMP-006'].id },
    update: {},
    create: {
      employeeId: emps['ST-EMP-006'].id,
      institute: 'Stanford University (Computer Science)',
      mentorName: 'Dr. Elena Rostova',
      projectTitle: 'Sovereign Context Scaling & Attention Compression in Transformer Architectures',
      stipend: 4000,
      startDate: new Date('2026-05-15'),
      endDate: new Date('2026-08-15'),
      status: 'ACTIVE',
      certificateIssued: false,
      performanceNotes: 'Demonstrates exceptional mathematical intuition and efficient PyTorch CUDA kernel implementation.',
    },
  });

  // 11. Performance Reviews
  await prisma.performanceReview.createMany({
    data: [
      {
        employeeId: emps['ST-EMP-002'].id,
        reviewerId: emps['ST-EMP-001'].id,
        reviewPeriod: 'H1 2026',
        rating: 5,
        goalsKpi: 'Architect and deploy 100K token context sovereign inference engine with sub-50ms TTFT.',
        managerFeedback: 'Elena demonstrated phenomenal technical rigor, delivering our sovereign AI cluster ahead of schedule.',
        employeeFeedback: 'Grateful for the top-tier hardware infrastructure and autonomy provided.',
        promotionRecommendation: 'Maintain Principal Architect status with increased research grant budget.',
        salaryRevisionRecommendation: 'Increase CTC by 10% effective Q3 2026.',
        status: 'SUBMITTED',
      },
      {
        employeeId: emps['ST-EMP-004'].id,
        reviewerId: emps['ST-EMP-001'].id,
        reviewPeriod: 'H1 2026',
        rating: 5,
        goalsKpi: 'Launch STALCI Showcase Studio 2.0 with full dynamic CMS synchronization and 60fps micro-animations.',
        managerFeedback: 'Sophia executed flawless engineering across all web platforms.',
        employeeFeedback: 'Excited about expanding our design systems across internal toolkits.',
        status: 'SUBMITTED',
      },
    ],
    skipDuplicates: true,
  });

  // 12. Training Records
  await prisma.trainingRecord.createMany({
    data: [
      {
        employeeId: emps['ST-EMP-003'].id,
        courseTitle: 'Advanced eBPF Kernel Observability with Cilium',
        trainer: 'Linux Foundation SRE Practice',
        skillsLearned: 'eBPF, XDP, Network Telemetry, Kernel Tracing',
        startDate: new Date('2026-04-01'),
        completionDate: new Date('2026-04-20'),
        status: 'COMPLETED',
        certificateUrl: 'https://credentials.linuxfoundation.org/stalci-ebpf',
      },
      {
        employeeId: emps['ST-EMP-004'].id,
        courseTitle: 'Zero-Trust Web Security & FIDO2 Cryptography',
        trainer: 'Cloudflare Security Academy',
        skillsLearned: 'Hardware MFA, WebAuthn, OAuth 2.1, TLS 1.3',
        startDate: new Date('2026-06-01'),
        completionDate: new Date('2026-06-15'),
        status: 'COMPLETED',
      },
    ],
    skipDuplicates: true,
  });

  // 13. Assets Inventory & Assignments
  const assetsData = [
    {
      name: 'Apple MacBook Pro 16" (M3 Max, 64GB Unified RAM, 1TB SSD)',
      assetType: 'Laptop',
      serialNumber: 'ST-MBP-2026-001',
      condition: 'EXCELLENT',
      assignedToId: emps['ST-EMP-001'].id,
      assignedDate: new Date('2024-01-15'),
      status: 'ASSIGNED',
      cost: 3999,
      notes: 'Primary executive workstation.',
    },
    {
      name: 'Apple MacBook Pro 16" (M3 Max, 128GB Unified RAM, 2TB SSD)',
      assetType: 'Laptop',
      serialNumber: 'ST-MBP-2026-002',
      condition: 'EXCELLENT',
      assignedToId: emps['ST-EMP-002'].id,
      assignedDate: new Date('2024-03-01'),
      status: 'ASSIGNED',
      cost: 4899,
      notes: 'AI model fine-tuning and local LLM evaluation workstation.',
    },
    {
      name: 'Dell UltraSharp 32" 4K Thunderbolt Hub Monitor',
      assetType: 'Monitor',
      serialNumber: 'ST-MON-2026-011',
      condition: 'EXCELLENT',
      assignedToId: emps['ST-EMP-004'].id,
      assignedDate: new Date('2025-01-10'),
      status: 'ASSIGNED',
      cost: 1099,
    },
    {
      name: 'YubiKey 5C NFC Enterprise Hardware Security Key',
      assetType: 'Security Card',
      serialNumber: 'ST-YUBI-2026-088',
      condition: 'NEW',
      assignedToId: emps['ST-EMP-003'].id,
      assignedDate: new Date('2024-06-15'),
      status: 'ASSIGNED',
      cost: 65,
    },
    {
      name: 'Apple MacBook Pro 14" (M3 Pro, 36GB RAM, 512GB SSD)',
      assetType: 'Laptop',
      serialNumber: 'ST-MBP-2026-009',
      condition: 'EXCELLENT',
      assignedToId: null,
      status: 'AVAILABLE',
      cost: 2499,
      notes: 'Spare hardware pod for incoming talent.',
    },
  ];

  for (const a of assetsData) {
    await prisma.asset.upsert({
      where: { serialNumber: a.serialNumber },
      update: a,
      create: a,
    });
  }

  // 14. Promotion & Transfer History
  await prisma.promotionTransferHistory.createMany({
    data: [
      {
        employeeId: emps['ST-EMP-002'].id,
        effectiveDate: new Date('2025-01-01'),
        previousDesignation: 'Senior AI Engineer',
        newDesignation: 'Principal AI / ML Architect',
        previousDepartment: 'Sovereign AI & Machine Learning',
        newDepartment: 'Sovereign AI & Machine Learning',
        previousSalary: 210000,
        newSalary: 240000,
        reason: 'Outstanding contribution to enterprise sovereign LLM deployment pipelines.',
        approvedBy: 'Abhishek Kumar',
      },
    ],
    skipDuplicates: true,
  });

  // 15. HR Letter Templates
  const templatesData = [
    {
      name: 'Official Enterprise Offer Letter',
      type: 'OFFER_LETTER',
      subject: 'Formal Offer of Employment — STALCI Global Technologies',
      bodyTemplate: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>On behalf of STALCI Global Technologies Inc., we are delighted to formally extend this offer of employment for the position of <strong>{{designation}}</strong> within our <strong>{{departmentName}}</strong>.</p>
<p><strong>Terms of Employment:</strong></p>
<ul>
  <li><strong>Annual Gross Remuneration (CTC):</strong> USD {{salaryCtc}}</li>
  <li><strong>Effective Joining Date:</strong> {{joiningDate}}</li>
  <li><strong>Work Location:</strong> {{workLocation}}</li>
  <li><strong>Probationary Window:</strong> {{probationMonths}} Months</li>
</ul>
<p>We are confident that your elite engineering caliber will elevate our mission in delivering mission-critical sovereign software solutions.</p>`,
    },
    {
      name: 'Internship Completion Certificate',
      type: 'INTERNSHIP_CERTIFICATE',
      subject: 'Certificate of Excellence & Internship Completion',
      bodyTemplate: `<p>This is to certify that <strong>{{employeeName}}</strong> from <strong>{{institute}}</strong> has successfully completed their engineering internship as <strong>{{designation}}</strong> at STALCI Global Technologies from {{startDate}} to {{endDate}}.</p>
<p>During this tenure, they architected and delivered: <strong>{{projectTitle}}</strong> under the mentorship of {{mentorName}}.</p>`,
    },
    {
      name: 'Experience & Service Certificate',
      type: 'EXPERIENCE_LETTER',
      subject: 'Experience & Service Certificate — STALCI',
      bodyTemplate: `<p>This document certifies that <strong>{{employeeName}}</strong> (Employee Code: {{employeeCode}}) was employed with STALCI Global Technologies Inc. from {{joiningDate}} to {{lastWorkingDate}} as <strong>{{designation}}</strong>.</p>
<p>During their employment, they exhibited exceptional software craftsmanship, integrity, and technical leadership.</p>`,
    },
    {
      name: 'Official Relieving Letter',
      type: 'RELIEVING_LETTER',
      subject: 'Formal Relieving Order & Discharge of Service',
      bodyTemplate: `<p>Dear <strong>{{employeeName}}</strong>,</p>
<p>With reference to your formal resignation, we confirm that you are relieved from your duties as <strong>{{designation}}</strong> at the close of business hours on <strong>{{lastWorkingDate}}</strong>.</p>
<p>All organizational clearances, IT hardware returns, and Full & Final financial settlements have been duly executed with zero outstanding obligations.</p>`,
    },
    {
      name: 'Promotion & Salary Revision Letter',
      type: 'PROMOTION_LETTER',
      subject: 'Promotion & Remuneration Revision Announcement',
      bodyTemplate: `<p>Dear <strong>{{employeeName}}</strong>,</p>
<p>In recognition of your exceptional performance and engineering leadership, we are proud to announce your promotion to <strong>{{newDesignation}}</strong> with a revised annual CTC of <strong>USD {{newSalary}}</strong> effective from {{effectiveDate}}.</p>`,
    },
  ];

  for (const t of templatesData) {
    const existing = await prisma.hRLetterTemplate.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.hRLetterTemplate.create({ data: t });
    }
  }

  console.log('✅ Complete HR & Employee Management System successfully seeded into PostgreSQL!');
}

async function main() {
  await seedHRData();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
