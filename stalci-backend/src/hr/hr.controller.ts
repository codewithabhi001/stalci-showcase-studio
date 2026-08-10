import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { HrService } from './hr.service';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  // 1. Dashboard Analytics
  @Get('dashboard/analytics')
  getDashboardAnalytics() {
    return this.hrService.getDashboardAnalytics();
  }

  // 2. Departments
  @Get('departments')
  getDepartments() {
    return this.hrService.getDepartments();
  }

  @Post('departments')
  createDepartment(@Body() body: any) {
    return this.hrService.createDepartment(body);
  }

  @Put('departments/:id')
  updateDepartment(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateDepartment(id, body);
  }

  @Delete('departments/:id')
  deleteDepartment(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.deleteDepartment(id);
  }

  // 3. Employees
  @Get('employees')
  getEmployees(
    @Query('departmentId') departmentId?: number,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('type') type?: string,
  ) {
    return this.hrService.getEmployees({ departmentId, status, search, type });
  }

  @Get('employees/:id')
  getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.getEmployeeById(id);
  }

  @Post('employees')
  createEmployee(@Body() body: any) {
    return this.hrService.createEmployee(body);
  }

  @Put('employees/:id')
  updateEmployee(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateEmployee(id, body);
  }

  @Delete('employees/:id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.deleteEmployee(id);
  }

  // 4. Recruitment Candidates & Convert to Employee
  @Get('candidates')
  getCandidates(@Query('stage') stage?: string) {
    return this.hrService.getCandidates(stage);
  }

  @Post('candidates')
  createCandidate(@Body() body: any) {
    return this.hrService.createCandidate(body);
  }

  @Put('candidates/:id')
  updateCandidate(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateCandidate(id, body);
  }

  @Post('candidates/:id/convert-to-employee')
  convertCandidateToEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.hrService.convertCandidateToEmployee(id, body);
  }

  // 5. Offer Letters
  @Get('offers')
  getOfferLetters() {
    return this.hrService.getOfferLetters();
  }

  @Post('offers')
  createOfferLetter(@Body() body: any) {
    return this.hrService.createOfferLetter(body);
  }

  @Put('offers/:id')
  updateOfferLetter(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateOfferLetter(id, body);
  }

  @Post('offers/:id/send')
  sendOfferLetter(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.sendOfferLetter(id);
  }

  // 6. Onboarding
  @Get('onboarding/:employeeId')
  getOnboardingByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number) {
    return this.hrService.getOnboardingByEmployee(employeeId);
  }

  @Put('onboarding/task/:taskId')
  toggleOnboardingTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.hrService.toggleOnboardingTask(taskId, isCompleted);
  }

  @Post('onboarding/:employeeId/task')
  addOnboardingTask(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() body: any,
  ) {
    return this.hrService.addOnboardingTask(employeeId, body);
  }

  // 7. Attendance & Leaves
  @Get('attendance')
  getAttendance(@Query('date') dateStr?: string) {
    return this.hrService.getAttendance(dateStr);
  }

  @Post('attendance')
  logAttendance(@Body() body: any) {
    return this.hrService.logAttendance(body);
  }

  @Get('leaves')
  getLeaveRequests(@Query('status') status?: string) {
    return this.hrService.getLeaveRequests(status);
  }

  @Post('leaves')
  createLeaveRequest(@Body() body: any) {
    return this.hrService.createLeaveRequest(body);
  }

  @Put('leaves/:id/approve')
  approveLeave(
    @Param('id', ParseIntPipe) id: number,
    @Body('approvedBy') approvedBy?: string,
  ) {
    return this.hrService.updateLeaveStatus(id, 'APPROVED', approvedBy || 'Admin');
  }

  @Put('leaves/:id/reject')
  rejectLeave(
    @Param('id', ParseIntPipe) id: number,
    @Body('approvedBy') approvedBy?: string,
  ) {
    return this.hrService.updateLeaveStatus(id, 'REJECTED', approvedBy || 'Admin');
  }

  // 8. Payroll & Payslips
  @Get('payroll')
  getPayrollRecords(
    @Query('month') month?: string,
    @Query('year') year?: number,
  ) {
    return this.hrService.getPayrollRecords(month, year);
  }

  @Post('payroll/run')
  runMonthlyPayroll(@Body() body: { month: string; year: number }) {
    return this.hrService.runMonthlyPayroll(body.month, body.year);
  }

  @Get('payroll/payslip/:id')
  getPayslip(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.getPayslip(id);
  }

  // 9. Internships
  @Get('internships')
  getInternships() {
    return this.hrService.getInternships();
  }

  @Post('internships')
  createInternship(@Body() body: any) {
    return this.hrService.createInternship(body);
  }

  @Put('internships/:id')
  updateInternship(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateInternship(id, body);
  }

  @Post('internships/:id/certificate')
  issueInternshipCertificate(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.issueInternshipCertificate(id);
  }

  // 10. Performance & Training
  @Get('performance')
  getPerformanceReviews(@Query('employeeId') employeeId?: number) {
    return this.hrService.getPerformanceReviews(employeeId);
  }

  @Post('performance')
  createPerformanceReview(@Body() body: any) {
    return this.hrService.createPerformanceReview(body);
  }

  @Get('training')
  getTrainings(@Query('employeeId') employeeId?: number) {
    return this.hrService.getTrainings(employeeId);
  }

  @Post('training')
  createTraining(@Body() body: any) {
    return this.hrService.createTraining(body);
  }

  // 11. Assets
  @Get('assets')
  getAssets(@Query('status') status?: string) {
    return this.hrService.getAssets(status);
  }

  @Post('assets')
  createAsset(@Body() body: any) {
    return this.hrService.createAsset(body);
  }

  @Put('assets/:id')
  updateAsset(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateAsset(id, body);
  }

  @Post('assets/:id/assign')
  assignAsset(
    @Param('id', ParseIntPipe) id: number,
    @Body('employeeId') employeeId: number,
  ) {
    return this.hrService.assignAsset(id, employeeId);
  }

  @Post('assets/:id/return')
  returnAsset(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.returnAsset(id);
  }

  @Delete('assets/:id')
  deleteAsset(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.deleteAsset(id);
  }

  // 12. HR Letter Templates
  @Get('letter-templates')
  getLetterTemplates() {
    return this.hrService.getLetterTemplates();
  }

  @Post('letter-templates')
  createLetterTemplate(@Body() body: any) {
    return this.hrService.createLetterTemplate(body);
  }

  @Put('letter-templates/:id')
  updateLetterTemplate(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateLetterTemplate(id, body);
  }

  @Delete('letter-templates/:id')
  deleteLetterTemplate(@Param('id', ParseIntPipe) id: number) {
    return this.hrService.deleteLetterTemplate(id);
  }

  // 13. Exits & Final Settlement
  @Get('exits')
  getExitClearances() {
    return this.hrService.getExitClearances();
  }

  @Post('exits')
  initiateExit(@Body() body: any) {
    return this.hrService.initiateExit(body);
  }

  @Put('exits/:id')
  updateClearance(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.hrService.updateClearance(id, body);
  }

  @Get('final-settlements')
  getFinalSettlements() {
    return this.hrService.getFinalSettlements();
  }

  @Post('final-settlements/:employeeId')
  calculateFinalSettlement(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Body() body: any,
  ) {
    return this.hrService.calculateFinalSettlement(employeeId, body);
  }

  // 14. RBAC Roles & Permissions
  @Get('rbac/roles')
  getRoles() {
    return this.hrService.getRoles();
  }

  @Get('rbac/permissions')
  getPermissions() {
    return this.hrService.getPermissions();
  }
}
