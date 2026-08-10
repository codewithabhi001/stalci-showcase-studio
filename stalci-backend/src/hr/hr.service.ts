import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HrService {
  constructor(private prisma: PrismaService) {}

  // ====================================================
  // 1. HR DASHBOARD & ANALYTICS
  // ====================================================
  async getDashboardAnalytics() {
    const totalEmployees = await this.prisma.employee.count({ where: { status: { not: 'ARCHIVED' } } });
    const activeEmployees = await this.prisma.employee.count({ where: { status: 'ACTIVE' } });
    const onboardingCount = await this.prisma.employee.count({ where: { status: 'ONBOARDING' } });
    const probationCount = await this.prisma.employee.count({ where: { probationStatus: 'PENDING' } });
    const internCount = await this.prisma.employee.count({ where: { employmentType: 'Intern', status: 'ACTIVE' } });
    const openCandidates = await this.prisma.candidate.count({ where: { stage: { notIn: ['HIRED', 'REJECTED'] } } });
    const pendingLeaves = await this.prisma.leaveRequest.count({ where: { status: 'PENDING' } });
    const assignedAssets = await this.prisma.asset.count({ where: { status: 'ASSIGNED' } });
    const totalAssets = await this.prisma.asset.count();

    const employees = await this.prisma.employee.findMany({
      where: { status: { not: 'ARCHIVED' } },
      select: { salaryCtc: true },
    });
    const totalCtc = employees.reduce((acc, curr) => acc + (curr.salaryCtc || 0), 0);
    const monthlyPayroll = Math.round(totalCtc / 12);

    const departments = await this.prisma.department.findMany({
      include: {
        _count: {
          select: { employees: true },
        },
      },
    });

    const recentHires = await this.prisma.employee.findMany({
      take: 5,
      orderBy: { joiningDate: 'desc' },
      include: { department: true },
    });

    const pendingLeaveList = await this.prisma.leaveRequest.findMany({
      where: { status: 'PENDING' },
      take: 5,
      include: { employee: true },
      orderBy: { createdAt: 'desc' },
    });

    return {
      totalEmployees,
      activeEmployees,
      onboardingCount,
      probationCount,
      internCount,
      openCandidates,
      pendingLeaves,
      assignedAssets,
      totalAssets,
      totalCtc,
      monthlyPayroll,
      departmentBreakdown: departments.map((d) => ({
        name: d.name,
        code: d.code,
        count: d._count.employees,
      })),
      recentHires,
      pendingLeaveList,
    };
  }

  // ====================================================
  // 2. DEPARTMENTS
  // ====================================================
  async getDepartments() {
    return this.prisma.department.findMany({
      include: {
        _count: { select: { employees: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async createDepartment(data: any) {
    return this.prisma.department.create({ data });
  }

  async updateDepartment(id: number, data: any) {
    return this.prisma.department.update({ where: { id }, data });
  }

  async deleteDepartment(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }

  // ====================================================
  // 3. EMPLOYEES & 360° LIFECYCLE PROFILE
  // ====================================================
  async getEmployees(params?: { departmentId?: number; status?: string; search?: string; type?: string }) {
    const where: any = {};
    if (params?.departmentId) where.departmentId = Number(params.departmentId);
    if (params?.status && params.status !== 'ALL') where.status = params.status;
    if (params?.type && params.type !== 'ALL') where.employmentType = params.type;
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { employeeCode: { contains: params.search, mode: 'insensitive' } },
        { designation: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.employee.findMany({
      where,
      include: {
        department: true,
        manager: { select: { id: true, name: true, employeeCode: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  async getEmployeeById(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        manager: true,
        subordinates: true,
        onboardingTasks: { orderBy: { id: 'asc' } },
        attendanceRecords: { orderBy: { date: 'desc' }, take: 30 },
        leaveRequests: { orderBy: { createdAt: 'desc' } },
        payrollRecords: { orderBy: { year: 'desc' }, take: 12 },
        internshipRecord: true,
        performanceReviews: { orderBy: { createdAt: 'desc' }, include: { reviewer: true } },
        trainings: { orderBy: { startDate: 'desc' } },
        assignedAssets: true,
        historyRecords: { orderBy: { effectiveDate: 'desc' } },
        documents: { orderBy: { uploadedAt: 'desc' } },
        exitClearance: true,
        finalSettlement: true,
      },
    });

    if (!employee) throw new NotFoundException(`Employee with ID ${id} not found`);
    return employee;
  }

  async createEmployee(data: any) {
    const count = await this.prisma.employee.count();
    const codeNumber = (count + 1).toString().padStart(3, '0');
    const employeeCode = data.employeeCode || `ST-EMP-${codeNumber}`;

    const emp = await this.prisma.employee.create({
      data: {
        ...data,
        employeeCode,
        salaryCtc: Number(data.salaryCtc || 0),
        departmentId: data.departmentId ? Number(data.departmentId) : undefined,
        managerId: data.managerId ? Number(data.managerId) : undefined,
        joiningDate: data.joiningDate ? new Date(data.joiningDate) : new Date(),
      },
    });

    // Automatically create onboarding tasks
    const tasks = [
      { taskName: 'Submit Government ID & Address Proof', category: 'Documentation' },
      { taskName: 'Direct Deposit / Bank Account Verification', category: 'Finance' },
      { taskName: 'Sign Master Employment Agreement & NDA', category: 'Legal' },
      { taskName: 'Provision Enterprise MacBook Pro & YubiKey Hardware', category: 'IT & Hardware' },
      { taskName: 'Setup Google Workspace & GitHub Enterprise Accounts', category: 'IT & Hardware' },
      { taskName: 'Executive Welcome Orientation & Team Introduction', category: 'Orientation' },
      { taskName: 'Security Awareness & SOC 2 Compliance Briefing', category: 'Training' },
    ];

    for (const t of tasks) {
      await this.prisma.onboardingTask.create({
        data: {
          employeeId: emp.id,
          taskName: t.taskName,
          category: t.category,
        },
      });
    }

    return emp;
  }

  async updateEmployee(id: number, data: any) {
    const existing = await this.prisma.employee.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Employee not found');

    // Check if designation or salary changed to record historical promotion/transfer
    if (
      (data.designation && data.designation !== existing.designation) ||
      (data.salaryCtc && Number(data.salaryCtc) !== existing.salaryCtc)
    ) {
      await this.prisma.promotionTransferHistory.create({
        data: {
          employeeId: id,
          effectiveDate: new Date(),
          previousDesignation: existing.designation,
          newDesignation: data.designation || existing.designation,
          previousSalary: existing.salaryCtc,
          newSalary: Number(data.salaryCtc || existing.salaryCtc),
          reason: data.revisionReason || 'Operational promotion / salary revision',
          approvedBy: 'Admin / HR Management',
        },
      });
    }

    return this.prisma.employee.update({
      where: { id },
      data: {
        ...data,
        salaryCtc: data.salaryCtc !== undefined ? Number(data.salaryCtc) : undefined,
        departmentId: data.departmentId !== undefined ? (data.departmentId ? Number(data.departmentId) : null) : undefined,
        managerId: data.managerId !== undefined ? (data.managerId ? Number(data.managerId) : null) : undefined,
      },
    });
  }

  async deleteEmployee(id: number) {
    return this.prisma.employee.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
  }

  // ====================================================
  // 4. RECRUITMENT PIPELINE & 1-CLICK CONVERSION
  // ====================================================
  async getCandidates(stage?: string) {
    const where: any = {};
    if (stage && stage !== 'ALL') where.stage = stage;

    return this.prisma.candidate.findMany({
      where,
      include: {
        job: true,
        offerLetter: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCandidate(data: any) {
    return this.prisma.candidate.create({
      data: {
        ...data,
        experienceYrs: Number(data.experienceYrs || 0),
        rating: Number(data.rating || 5),
        jobId: data.jobId ? Number(data.jobId) : undefined,
      },
    });
  }

  async updateCandidate(id: number, data: any) {
    return this.prisma.candidate.update({
      where: { id },
      data: {
        ...data,
        experienceYrs: data.experienceYrs !== undefined ? Number(data.experienceYrs) : undefined,
        rating: data.rating !== undefined ? Number(data.rating) : undefined,
      },
    });
  }

  async convertCandidateToEmployee(candidateId: number, options?: { departmentId?: number; designation?: string; salaryCtc?: number }) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
      include: { offerLetter: true, job: true },
    });

    if (!candidate) throw new NotFoundException('Candidate not found');
    if (candidate.convertedToEmp && candidate.convertedEmpId) {
      return this.getEmployeeById(candidate.convertedEmpId);
    }

    const count = await this.prisma.employee.count();
    const codeNumber = (count + 1).toString().padStart(3, '0');
    const employeeCode = `ST-EMP-${codeNumber}`;

    const defaultDept = await this.prisma.department.findFirst();

    const emp = await this.createEmployee({
      employeeCode,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      departmentId: options?.departmentId || defaultDept?.id,
      designation: options?.designation || candidate.offerLetter?.designation || candidate.job?.title || 'Software Engineer',
      salaryCtc: options?.salaryCtc || candidate.offerLetter?.salaryCtc || 150000,
      skills: candidate.skills ? JSON.stringify(candidate.skills.split(',').map((s) => s.trim())) : null,
      status: 'ONBOARDING',
      joiningDate: candidate.offerLetter?.joiningDate || new Date(),
    });

    await this.prisma.candidate.update({
      where: { id: candidateId },
      data: {
        stage: 'HIRED',
        convertedToEmp: true,
        convertedEmpId: emp.id,
      },
    });

    return emp;
  }

  // ====================================================
  // 5. OFFER LETTERS
  // ====================================================
  async getOfferLetters() {
    return this.prisma.offerLetter.findMany({
      include: { candidate: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createOfferLetter(data: any) {
    return this.prisma.offerLetter.create({
      data: {
        ...data,
        candidateId: Number(data.candidateId),
        salaryCtc: Number(data.salaryCtc),
        probationMonths: Number(data.probationMonths || 3),
        joiningDate: new Date(data.joiningDate),
      },
    });
  }

  async updateOfferLetter(id: number, data: any) {
    return this.prisma.offerLetter.update({
      where: { id },
      data: {
        ...data,
        salaryCtc: data.salaryCtc !== undefined ? Number(data.salaryCtc) : undefined,
      },
    });
  }

  async sendOfferLetter(id: number) {
    return this.prisma.offerLetter.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date(),
      },
    });
  }

  async deleteOfferLetter(id: number) {
    return this.prisma.offerLetter.delete({ where: { id: Number(id) } });
  }

  // ====================================================
  // 6. ONBOARDING
  // ====================================================
  async getOnboardingByEmployee(employeeId: number) {
    return this.prisma.onboardingTask.findMany({
      where: { employeeId },
      orderBy: { id: 'asc' },
    });
  }

  async toggleOnboardingTask(taskId: number, isCompleted: boolean) {
    return this.prisma.onboardingTask.update({
      where: { id: taskId },
      data: {
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });
  }

  async addOnboardingTask(employeeId: number, data: any) {
    return this.prisma.onboardingTask.create({
      data: {
        employeeId,
        taskName: data.taskName,
        category: data.category || 'General',
      },
    });
  }

  async deleteOnboardingTask(taskId: number) {
    return this.prisma.onboardingTask.delete({ where: { id: Number(taskId) } });
  }

  // ====================================================
  // 7. ATTENDANCE & LEAVES
  // ====================================================
  async getAttendance(dateStr?: string) {
    const targetDate = dateStr ? new Date(dateStr) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    return this.prisma.attendanceRecord.findMany({
      where: { date: targetDate },
      include: { employee: { include: { department: true } } },
      orderBy: { employeeId: 'asc' },
    });
  }

  async logAttendance(data: { employeeId: number; date: string; status: string; checkIn?: string; checkOut?: string; notes?: string }) {
    const date = new Date(data.date);
    date.setHours(0, 0, 0, 0);

    return this.prisma.attendanceRecord.upsert({
      where: {
        employeeId_date: {
          employeeId: Number(data.employeeId),
          date,
        },
      },
      update: {
        status: data.status,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        notes: data.notes,
      },
      create: {
        employeeId: Number(data.employeeId),
        date,
        status: data.status,
        checkIn: data.checkIn || '09:00 AM',
        checkOut: data.checkOut || '06:00 PM',
        notes: data.notes,
      },
    });
  }

  async getLeaveRequests(status?: string) {
    const where: any = {};
    if (status && status !== 'ALL') where.status = status;

    return this.prisma.leaveRequest.findMany({
      where,
      include: { employee: { include: { department: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createLeaveRequest(data: any) {
    return this.prisma.leaveRequest.create({
      data: {
        ...data,
        employeeId: Number(data.employeeId),
        daysCount: Number(data.daysCount || 1),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  }

  async updateLeaveStatus(id: number, status: 'APPROVED' | 'REJECTED', approvedBy: string) {
    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status,
        approvedBy,
        approvedAt: new Date(),
      },
    });
  }

  // ====================================================
  // 8. PAYROLL & PAYSLIP ENGINE
  // ====================================================
  async getPayrollRecords(month?: string, year?: number) {
    const where: any = {};
    if (month && month !== 'ALL') where.month = month;
    if (year) where.year = Number(year);

    return this.prisma.payrollRecord.findMany({
      where,
      include: { employee: { include: { department: true } } },
      orderBy: { employeeId: 'asc' },
    });
  }

  async runMonthlyPayroll(month: string, year: number) {
    const employees = await this.prisma.employee.findMany({
      where: { status: { in: ['ACTIVE', 'PROBATION', 'ON_LEAVE'] } },
    });

    const results = [];
    for (const emp of employees) {
      const monthlyGross = Math.round(emp.salaryCtc / 12);
      const basic = Math.round(monthlyGross * 0.5);
      const hra = Math.round(monthlyGross * 0.3);
      const allowances = monthlyGross - (basic + hra);
      const tax = Math.round(monthlyGross * 0.15);
      const netSalary = monthlyGross - tax;

      const record = await this.prisma.payrollRecord.upsert({
        where: {
          employeeId_month_year: {
            employeeId: emp.id,
            month,
            year: Number(year),
          },
        },
        update: {
          basicSalary: basic,
          hra,
          allowances,
          taxDeductions: tax,
          netSalary,
          status: 'PAID',
          paidAt: new Date(),
        },
        create: {
          employeeId: emp.id,
          month,
          year: Number(year),
          basicSalary: basic,
          hra,
          allowances,
          bonus: 0,
          deductions: 0,
          taxDeductions: tax,
          netSalary,
          status: 'PAID',
          paidAt: new Date(),
          referenceNumber: `STALCI-PAY-${year}${month.substring(0, 3).toUpperCase()}-${emp.id}`,
        },
      });
      results.push(record);
    }

    return { message: `Payroll generated for ${results.length} active employees`, count: results.length };
  }

  async getPayslip(payrollId: number) {
    const record = await this.prisma.payrollRecord.findUnique({
      where: { id: payrollId },
      include: { employee: { include: { department: true } } },
    });
    if (!record) throw new NotFoundException('Payroll record not found');
    return record;
  }

  async updatePayrollRecord(id: number, data: any) {
    const basic = Number(data.basicSalary || 0);
    const hra = Number(data.hra || 0);
    const allowances = Number(data.allowances || 0);
    const bonus = Number(data.bonus || 0);
    const deductions = Number(data.deductions || 0);
    const taxDeductions = Number(data.taxDeductions || 0);
    const netSalary = (basic + hra + allowances + bonus) - (deductions + taxDeductions);

    return this.prisma.payrollRecord.update({
      where: { id: Number(id) },
      data: {
        basicSalary: basic,
        hra,
        allowances,
        bonus,
        deductions,
        taxDeductions,
        netSalary,
        paymentMode: data.paymentMode || 'Direct Wire',
        referenceNumber: data.referenceNumber,
        status: data.status || 'PROCESSED',
      },
      include: { employee: { include: { department: true } } },
    });
  }

  async disbursePayroll(id: number, paymentMode?: string, referenceNumber?: string) {
    return this.prisma.payrollRecord.update({
      where: { id: Number(id) },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        paymentMode: paymentMode || 'Direct Wire',
        referenceNumber: referenceNumber || `STALCI-WIRE-${Date.now()}`,
      },
      include: { employee: true },
    });
  }

  // ====================================================
  // 9. INTERNSHIP MANAGEMENT
  // ====================================================
  async getInternships() {
    return this.prisma.internshipRecord.findMany({
      include: { employee: { include: { department: true } } },
      orderBy: { startDate: 'desc' },
    });
  }

  async createInternship(data: any) {
    return this.prisma.internshipRecord.create({
      data: {
        ...data,
        employeeId: Number(data.employeeId),
        stipend: Number(data.stipend || 0),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  }

  async updateInternship(id: number, data: any) {
    return this.prisma.internshipRecord.update({
      where: { id },
      data: {
        ...data,
        stipend: data.stipend !== undefined ? Number(data.stipend) : undefined,
      },
    });
  }

  async issueInternshipCertificate(id: number) {
    return this.prisma.internshipRecord.update({
      where: { id },
      data: {
        certificateIssued: true,
        status: 'COMPLETED',
      },
    });
  }

  async deleteInternship(id: number) {
    return this.prisma.internshipRecord.delete({ where: { id: Number(id) } });
  }

  async createEmployeeDocument(employeeId: number, data: { documentName?: string; fileName?: string; documentType: string; documentUrl?: string; fileUrl?: string }) {
    return this.prisma.employeeDocument.create({
      data: {
        employeeId: Number(employeeId),
        fileName: data.documentName || data.fileName || "Document",
        documentType: data.documentType || "GENERAL",
        fileUrl: data.documentUrl || data.fileUrl || "",
      },
    });
  }

  async deleteEmployeeDocument(id: number) {
    return this.prisma.employeeDocument.delete({ where: { id: Number(id) } });
  }

  // ====================================================
  // 10. PERFORMANCE & TRAINING
  // ====================================================
  async getPerformanceReviews(employeeId?: number) {
    const where: any = {};
    if (employeeId) where.employeeId = Number(employeeId);

    return this.prisma.performanceReview.findMany({
      where,
      include: {
        employee: { include: { department: true } },
        reviewer: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPerformanceReview(data: any) {
    return this.prisma.performanceReview.create({
      data: {
        ...data,
        employeeId: Number(data.employeeId),
        reviewerId: data.reviewerId ? Number(data.reviewerId) : undefined,
        rating: Number(data.rating || 5),
      },
    });
  }

  async updatePerformanceReview(id: number, data: any) {
    return this.prisma.performanceReview.update({
      where: { id: Number(id) },
      data: {
        ...data,
        rating: data.rating !== undefined ? Number(data.rating) : undefined,
      },
    });
  }

  async getTrainings(employeeId?: number) {
    const where: any = {};
    if (employeeId) where.employeeId = Number(employeeId);

    return this.prisma.trainingRecord.findMany({
      where,
      include: { employee: true },
      orderBy: { startDate: 'desc' },
    });
  }

  async createTraining(data: any) {
    return this.prisma.trainingRecord.create({
      data: {
        ...data,
        employeeId: Number(data.employeeId),
        startDate: new Date(data.startDate),
        completionDate: data.completionDate ? new Date(data.completionDate) : null,
      },
    });
  }

  async updateTraining(id: number, data: any) {
    return this.prisma.trainingRecord.update({
      where: { id: Number(id) },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        completionDate: data.completionDate ? new Date(data.completionDate) : undefined,
      },
    });
  }

  // ====================================================
  // 11. ASSETS INVENTORY & ASSIGNMENTS
  // ====================================================
  async getAssets(status?: string) {
    const where: any = {};
    if (status && status !== 'ALL') where.status = status;

    return this.prisma.asset.findMany({
      where,
      include: { assignedTo: { include: { department: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAsset(data: any) {
    return this.prisma.asset.create({
      data: {
        ...data,
        cost: data.cost ? Number(data.cost) : undefined,
        assignedToId: data.assignedToId ? Number(data.assignedToId) : undefined,
        assignedDate: data.assignedToId ? new Date() : null,
        status: data.assignedToId ? 'ASSIGNED' : 'AVAILABLE',
      },
    });
  }

  async updateAsset(id: number, data: any) {
    return this.prisma.asset.update({
      where: { id },
      data: {
        ...data,
        assignedToId: data.assignedToId !== undefined ? (data.assignedToId ? Number(data.assignedToId) : null) : undefined,
        cost: data.cost !== undefined ? Number(data.cost) : undefined,
      },
    });
  }

  async assignAsset(id: number, employeeId: number) {
    return this.prisma.asset.update({
      where: { id },
      data: {
        assignedToId: Number(employeeId),
        assignedDate: new Date(),
        status: 'ASSIGNED',
      },
    });
  }

  async returnAsset(id: number) {
    return this.prisma.asset.update({
      where: { id },
      data: {
        assignedToId: null,
        returnDate: new Date(),
        status: 'AVAILABLE',
      },
    });
  }

  async deleteAsset(id: number) {
    return this.prisma.asset.delete({ where: { id } });
  }

  // ====================================================
  // 12. HR LETTER TEMPLATES & GENERATION
  // ====================================================
  async getLetterTemplates() {
    return this.prisma.hRLetterTemplate.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async createLetterTemplate(data: any) {
    return this.prisma.hRLetterTemplate.create({ data });
  }

  async updateLetterTemplate(id: number, data: any) {
    return this.prisma.hRLetterTemplate.update({ where: { id }, data });
  }

  async deleteLetterTemplate(id: number) {
    return this.prisma.hRLetterTemplate.delete({ where: { id } });
  }

  // ====================================================
  // 13. EXIT CLEARANCE & FINAL SETTLEMENT (F&F)
  // ====================================================
  async getExitClearances() {
    return this.prisma.exitClearance.findMany({
      include: {
        employee: { include: { department: true, finalSettlement: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async initiateExit(data: { employeeId: number; resignationDate: string; lastWorkingDay: string; reason: string; noticePeriodDays?: number }) {
    const employeeId = Number(data.employeeId);
    await this.prisma.employee.update({
      where: { id: employeeId },
      data: {
        status: 'NOTICE_PERIOD',
        resignationDate: new Date(data.resignationDate),
        lastWorkingDate: new Date(data.lastWorkingDay),
        exitReason: data.reason,
      },
    });

    return this.prisma.exitClearance.upsert({
      where: { employeeId },
      update: {
        resignationDate: new Date(data.resignationDate),
        lastWorkingDay: new Date(data.lastWorkingDay),
        reason: data.reason,
        noticePeriodDays: Number(data.noticePeriodDays || 30),
      },
      create: {
        employeeId,
        resignationDate: new Date(data.resignationDate),
        lastWorkingDay: new Date(data.lastWorkingDay),
        reason: data.reason,
        noticePeriodDays: Number(data.noticePeriodDays || 30),
      },
    });
  }

  async updateClearance(id: number, data: any) {
    return this.prisma.exitClearance.update({
      where: { id },
      data,
    });
  }

  async getFinalSettlements() {
    return this.prisma.finalSettlement.findMany({
      include: { employee: { include: { department: true, exitClearance: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async calculateFinalSettlement(employeeId: number, data: any) {
    const emp = await this.prisma.employee.findUnique({ where: { id: Number(employeeId) } });
    if (!emp) throw new NotFoundException('Employee not found');

    const pendingSalary = Number(data.pendingSalary || Math.round(emp.salaryCtc / 12));
    const leaveEncashment = Number(data.leaveEncashment || 0);
    const bonusIncentives = Number(data.bonusIncentives || 0);
    const deductions = Number(data.deductions || 0);
    const noticePayAdjustment = Number(data.noticePayAdjustment || 0);

    const netPayableAmount = pendingSalary + leaveEncashment + bonusIncentives - deductions - noticePayAdjustment;

    return this.prisma.finalSettlement.upsert({
      where: { employeeId: Number(employeeId) },
      update: {
        pendingSalary,
        leaveEncashment,
        bonusIncentives,
        deductions,
        noticePayAdjustment,
        netPayableAmount,
        status: data.status || 'PENDING',
        remarks: data.remarks,
      },
      create: {
        employeeId: Number(employeeId),
        pendingSalary,
        leaveEncashment,
        bonusIncentives,
        deductions,
        noticePayAdjustment,
        netPayableAmount,
        status: data.status || 'PENDING',
        remarks: data.remarks,
      },
    });
  }

  // ====================================================
  // 14. RBAC ROLES & PERMISSIONS
  // ====================================================
  async getRoles() {
    return this.prisma.role.findMany({
      include: {
        permissions: true,
        userRoles: {
          include: {
            employee: {
              select: { id: true, name: true, employeeCode: true, designation: true, email: true },
            },
          },
        },
        _count: { select: { userRoles: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  async getPermissions() {
    return this.prisma.permission.findMany({
      orderBy: { category: 'asc' },
    });
  }

  async assignRoleToEmployee(employeeId: number, roleId: number) {
    // Delete existing roles for employee to keep single primary role or add role
    await this.prisma.userRole.deleteMany({
      where: { employeeId: Number(employeeId) },
    });

    return this.prisma.userRole.create({
      data: {
        employeeId: Number(employeeId),
        roleId: Number(roleId),
      },
      include: {
        role: true,
        employee: true,
      },
    });
  }

  async updateRolePermissions(roleId: number, permissionIds: number[]) {
    return this.prisma.role.update({
      where: { id: Number(roleId) },
      data: {
        permissions: {
          set: permissionIds.map((id) => ({ id: Number(id) })),
        },
      },
      include: {
        permissions: true,
      },
    });
  }
}
