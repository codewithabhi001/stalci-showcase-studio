/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4001`
    : "http://127.0.0.1:4001");

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// --- CLIENTS ---
export const fetchClients = () => api.get("/crm/clients").then((r) => r.data);
export const fetchClientById = (id: number) => api.get(`/crm/clients/${id}`).then((r) => r.data);
export const createClient = (data: any) => api.post("/crm/clients", data).then((r) => r.data);
export const updateClient = (id: number, data: any) => api.put(`/crm/clients/${id}`, data).then((r) => r.data);
export const deleteClient = (id: number) => api.delete(`/crm/clients/${id}`).then((r) => r.data);

// --- PROJECTS ---
export const fetchProjects = (category?: string, featured?: boolean) => {
  const params: any = {};
  if (category && category !== "All") params.category = category;
  if (featured !== undefined) params.featured = featured;
  return api.get("/projects", { params }).then((r) => r.data);
};
export const fetchFeaturedProjects = () => api.get("/projects/featured").then((r) => r.data);
export const fetchProjectById = (id: number) => api.get(`/projects/${id}`).then((r) => r.data);
export const createProject = (data: any) => api.post("/projects", data).then((r) => r.data);
export const updateProject = (id: number, data: any) => api.put(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id: number) => api.delete(`/projects/${id}`).then((r) => r.data);

// --- FINANCE & INVOICES ---
export const fetchInvoices = (status?: string, clientId?: number) => {
  const params: any = {};
  if (status && status !== "ALL") params.status = status;
  if (clientId) params.clientId = clientId;
  return api.get("/finance/invoices", { params }).then((r) => r.data);
};
export const fetchInvoiceById = (id: number) => api.get(`/finance/invoices/${id}`).then((r) => r.data);
export const createInvoice = (data: any) => api.post("/finance/invoices", data).then((r) => r.data);
export const updateInvoice = (id: number, data: any) => api.put(`/finance/invoices/${id}`, data).then((r) => r.data);
export const duplicateInvoice = (id: number) => api.post(`/finance/invoices/${id}/duplicate`).then((r) => r.data);
export const updateInvoiceStatus = (id: number, status: string) => api.patch(`/finance/invoices/${id}/status`, { status }).then((r) => r.data);
export const deleteInvoice = (id: number) => api.delete(`/finance/invoices/${id}`).then((r) => r.data);

// --- INVOICE TEMPLATES ---
export const fetchInvoiceTemplates = () => api.get("/finance/templates").then((r) => r.data);
export const fetchInvoiceTemplateById = (id: number) => api.get(`/finance/templates/${id}`).then((r) => r.data);
export const createInvoiceTemplate = (data: any) => api.post("/finance/templates", data).then((r) => r.data);
export const updateInvoiceTemplate = (id: number, data: any) => api.put(`/finance/templates/${id}`, data).then((r) => r.data);
export const deleteInvoiceTemplate = (id: number) => api.delete(`/finance/templates/${id}`).then((r) => r.data);

// --- TECHNOLOGIES & SKILLS ---
export const fetchTechnologies = (category?: string) => {
  const params = category && category !== "All" ? { category } : {};
  return api.get("/cms/technologies", { params }).then((r) => r.data);
};
export const createTechnology = (data: any) => api.post("/cms/technologies", data).then((r) => r.data);
export const updateTechnology = (id: number, data: any) => api.put(`/cms/technologies/${id}`, data).then((r) => r.data);
export const deleteTechnology = (id: number) => api.delete(`/cms/technologies/${id}`).then((r) => r.data);

// --- CMS ---
export const fetchPages = () => api.get("/cms/pages").then((r) => r.data);
export const createPage = (data: any) => api.post("/cms/pages", data).then((r) => r.data);
export const updatePage = (id: number, data: any) => api.put(`/cms/pages/${id}`, data).then((r) => r.data);
export const deletePage = (id: number) => api.delete(`/cms/pages/${id}`).then((r) => r.data);

export const fetchBlogs = () => api.get("/cms/blogs").then((r) => r.data);
export const createBlog = (data: any) => api.post("/cms/blogs", data).then((r) => r.data);
export const updateBlog = (id: number, data: any) => api.put(`/cms/blogs/${id}`, data).then((r) => r.data);
export const deleteBlog = (id: number) => api.delete(`/cms/blogs/${id}`).then((r) => r.data);

export const fetchIndustries = () => api.get("/cms/industries").then((r) => r.data);
export const createIndustry = (data: any) => api.post("/cms/industries", data).then((r) => r.data);
export const updateIndustry = (id: number, data: any) => api.put(`/cms/industries/${id}`, data).then((r) => r.data);
export const deleteIndustry = (id: number) => api.delete(`/cms/industries/${id}`).then((r) => r.data);

export const fetchProducts = () => api.get("/cms/products").then((r) => r.data);
export const createProduct = (data: any) => api.post("/cms/products", data).then((r) => r.data);
export const updateProduct = (id: number, data: any) => api.put(`/cms/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id: number) => api.delete(`/cms/products/${id}`).then((r) => r.data);

export const fetchServices = () => api.get("/cms/services").then((r) => r.data);
export const createService = (data: any) => api.post("/cms/services", data).then((r) => r.data);
export const updateService = (id: number, data: any) => api.put(`/cms/services/${id}`, data).then((r) => r.data);
export const deleteService = (id: number) => api.delete(`/cms/services/${id}`).then((r) => r.data);

export const fetchTestimonials = () => api.get("/cms/testimonials").then((r) => r.data);
export const createTestimonial = (data: any) => api.post("/cms/testimonials", data).then((r) => r.data);
export const updateTestimonial = (id: number, data: any) => api.put(`/cms/testimonials/${id}`, data).then((r) => r.data);
export const deleteTestimonial = (id: number) => api.delete(`/cms/testimonials/${id}`).then((r) => r.data);

export const fetchSiteConfig = () => api.get("/cms/config").then((r) => r.data);
export const updateSiteConfig = (key: string, value: string) => api.put(`/cms/config/${key}`, { value }).then((r) => r.data);

// --- CRM & CAREERS ---
export const fetchJobs = () => api.get("/crm/jobs/all").then((r) => r.data);
export const createJob = (data: any) => api.post("/crm/jobs", data).then((r) => r.data);
export const updateJob = (id: number, data: any) => api.put(`/crm/jobs/${id}`, data).then((r) => r.data);
export const deleteJob = (id: number) => api.delete(`/crm/jobs/${id}`).then((r) => r.data);

export const fetchApplications = () => api.get("/crm/applications").then((r) => r.data);
export const updateApplication = (id: number, data: any) => api.put(`/crm/applications/${id}`, data).then((r) => r.data);
export const deleteApplication = (id: number) => api.delete(`/crm/applications/${id}`).then((r) => r.data);

export const fetchInquiries = () => api.get("/crm/inquiries").then((r) => r.data);
export const createInquiry = (data: any) => api.post("/crm/inquiries", data).then((r) => r.data);
export const updateInquiry = (id: number, data: any) => api.put(`/crm/inquiries/${id}`, data).then((r) => r.data);
export const deleteInquiry = (id: number) => api.delete(`/crm/inquiries/${id}`).then((r) => r.data);

export const fetchFeedbacks = () => api.get("/crm/feedback").then((r) => r.data);
export const createFeedback = (data: any) => api.post("/crm/feedback", data).then((r) => r.data);
export const updateFeedback = (id: number, data: any) => api.put(`/crm/feedback/${id}`, data).then((r) => r.data);
export const deleteFeedback = (id: number) => api.delete(`/crm/feedback/${id}`).then((r) => r.data);

// --- STATS & ADMIN ---
export const fetchStats = () => api.get("/finance/stats").then((r) => r.data);
export const fetchProfile = () => api.get("/admin/profile").then((r) => r.data);
export const updateProfile = (data: any) => api.put("/admin/profile", data).then((r) => r.data);
export const fetchNotifications = () => api.get("/admin/notifications").then((r) => r.data);
export const markNotificationsRead = () => api.put("/admin/notifications/read").then((r) => r.data);

// ==========================================
// --- HR & EMPLOYEE MANAGEMENT MODULE APIs ---
// ==========================================

// 1. Dashboard Analytics
export const fetchHrDashboard = () => api.get("/hr/dashboard/analytics").then((r) => r.data);

// 2. Departments
export const fetchDepartments = () => api.get("/hr/departments").then((r) => r.data);
export const createDepartment = (data: any) => api.post("/hr/departments", data).then((r) => r.data);
export const updateDepartment = (id: number, data: any) => api.put(`/hr/departments/${id}`, data).then((r) => r.data);
export const deleteDepartment = (id: number) => api.delete(`/hr/departments/${id}`).then((r) => r.data);

// 3. Employees
export const fetchEmployees = (params?: { departmentId?: number; status?: string; search?: string; type?: string }) =>
  api.get("/hr/employees", { params }).then((r) => r.data);
export const fetchEmployeeById = (id: number) => api.get(`/hr/employees/${id}`).then((r) => r.data);
export const createEmployee = (data: any) => api.post("/hr/employees", data).then((r) => r.data);
export const updateEmployee = (id: number, data: any) => api.put(`/hr/employees/${id}`, data).then((r) => r.data);
export const deleteEmployee = (id: number) => api.delete(`/hr/employees/${id}`).then((r) => r.data);

// 4. Recruitment Candidates
export const fetchCandidates = (stage?: string) =>
  api.get("/hr/candidates", { params: stage ? { stage } : {} }).then((r) => r.data);
export const createCandidate = (data: any) => api.post("/hr/candidates", data).then((r) => r.data);
export const updateCandidate = (id: number, data: any) => api.put(`/hr/candidates/${id}`, data).then((r) => r.data);
export const convertCandidateToEmployee = (candidateId: number, data?: any) =>
  api.post(`/hr/candidates/${candidateId}/convert-to-employee`, data || {}).then((r) => r.data);

// 5. Offer Letters
export const fetchOfferLetters = () => api.get("/hr/offers").then((r) => r.data);
export const createOfferLetter = (data: any) => api.post("/hr/offers", data).then((r) => r.data);
export const updateOfferLetter = (id: number, data: any) => api.put(`/hr/offers/${id}`, data).then((r) => r.data);
export const sendOfferLetter = (id: number) => api.post(`/hr/offers/${id}/send`).then((r) => r.data);
export const deleteOfferLetter = (id: number) => api.delete(`/hr/offers/${id}`).then((r) => r.data);

// 6. Onboarding
export const fetchOnboarding = (employeeId: number) => api.get(`/hr/onboarding/${employeeId}`).then((r) => r.data);
export const toggleOnboardingTask = (taskId: number, isCompleted: boolean) =>
  api.put(`/hr/onboarding/task/${taskId}`, { isCompleted }).then((r) => r.data);
export const addOnboardingTask = (employeeId: number, data: any) =>
  api.post(`/hr/onboarding/${employeeId}/task`, data).then((r) => r.data);
export const deleteOnboardingTask = (taskId: number) =>
  api.delete(`/hr/onboarding/task/${taskId}`).then((r) => r.data);

// 7. Attendance & Leaves
export const fetchAttendance = (date?: string) =>
  api.get("/hr/attendance", { params: date ? { date } : {} }).then((r) => r.data);
export const logAttendance = (data: any) => api.post("/hr/attendance", data).then((r) => r.data);
export const fetchLeaves = (status?: string) =>
  api.get("/hr/leaves", { params: status ? { status } : {} }).then((r) => r.data);
export const createLeaveRequest = (data: any) => api.post("/hr/leaves", data).then((r) => r.data);
export const approveLeave = (id: number, approvedBy?: string) =>
  api.put(`/hr/leaves/${id}/approve`, { approvedBy }).then((r) => r.data);
export const rejectLeave = (id: number, approvedBy?: string) =>
  api.put(`/hr/leaves/${id}/reject`, { approvedBy }).then((r) => r.data);

// 8. Payroll & Payslips
export const fetchPayroll = (params?: { month?: string; year?: number }) =>
  api.get("/hr/payroll", { params }).then((r) => r.data);
export const runMonthlyPayroll = (data: { month: string; year: number }) =>
  api.post("/hr/payroll/run", data).then((r) => r.data);
export const createManualPayrollRecord = (data: any) =>
  api.post("/hr/payroll/manual", data).then((r) => r.data);
export const fetchPayslip = (id: number) => api.get(`/hr/payroll/payslip/${id}`).then((r) => r.data);
export const updatePayrollRecord = (id: number, data: any) => api.put(`/hr/payroll/${id}`, data).then((r) => r.data);
export const disbursePayroll = (id: number, data?: { paymentMode?: string; referenceNumber?: string; paymentReceiptUrl?: string; disbursedBy?: string }) =>
  api.post(`/hr/payroll/${id}/disburse`, data || {}).then((r) => r.data);

// 9. Internships
export const fetchInternships = () => api.get("/hr/internships").then((r) => r.data);
export const createInternship = (data: any) => api.post("/hr/internships", data).then((r) => r.data);
export const updateInternship = (id: number, data: any) => api.put(`/hr/internships/${id}`, data).then((r) => r.data);
export const issueInternshipCertificate = (id: number) =>
  api.post(`/hr/internships/${id}/certificate`).then((r) => r.data);
export const deleteInternship = (id: number) => api.delete(`/hr/internships/${id}`).then((r) => r.data);

export const createEmployeeDocument = (employeeId: number, data: { documentName: string; documentType: string; documentUrl: string }) =>
  api.post(`/hr/employees/${employeeId}/documents`, data).then((r) => r.data);
export const deleteEmployeeDocument = (id: number) => api.delete(`/hr/documents/${id}`).then((r) => r.data);

// 10. Performance & Training
export const fetchPerformanceReviews = (employeeId?: number) =>
  api.get("/hr/performance", { params: employeeId ? { employeeId } : {} }).then((r) => r.data);
export const createPerformanceReview = (data: any) => api.post("/hr/performance", data).then((r) => r.data);
export const updatePerformanceReview = (id: number, data: any) => api.put(`/hr/performance/${id}`, data).then((r) => r.data);
export const fetchTrainings = (employeeId?: number) =>
  api.get("/hr/training", { params: employeeId ? { employeeId } : {} }).then((r) => r.data);
export const createTraining = (data: any) => api.post("/hr/training", data).then((r) => r.data);
export const updateTraining = (id: number, data: any) => api.put(`/hr/training/${id}`, data).then((r) => r.data);

// 11. Assets
export const fetchAssets = (status?: string) =>
  api.get("/hr/assets", { params: status ? { status } : {} }).then((r) => r.data);
export const createAsset = (data: any) => api.post("/hr/assets", data).then((r) => r.data);
export const updateAsset = (id: number, data: any) => api.put(`/hr/assets/${id}`, data).then((r) => r.data);
export const assignAsset = (id: number, employeeId: number) =>
  api.post(`/hr/assets/${id}/assign`, { employeeId }).then((r) => r.data);
export const returnAsset = (id: number) => api.post(`/hr/assets/${id}/return`).then((r) => r.data);
export const deleteAsset = (id: number) => api.delete(`/hr/assets/${id}`).then((r) => r.data);

// 12. HR Letter Templates
export const fetchLetterTemplates = () => api.get("/hr/letter-templates").then((r) => r.data);
export const createLetterTemplate = (data: any) => api.post("/hr/letter-templates", data).then((r) => r.data);
export const updateLetterTemplate = (id: number, data: any) =>
  api.put(`/hr/letter-templates/${id}`, data).then((r) => r.data);
export const deleteLetterTemplate = (id: number) => api.delete(`/hr/letter-templates/${id}`).then((r) => r.data);

// 13. Exits & Final Settlement
export const fetchExits = () => api.get("/hr/exits").then((r) => r.data);
export const initiateExit = (data: any) => api.post("/hr/exits", data).then((r) => r.data);
export const updateClearance = (id: number, data: any) => api.put(`/hr/exits/${id}`, data).then((r) => r.data);
export const fetchFinalSettlements = () => api.get("/hr/final-settlements").then((r) => r.data);
export const calculateFinalSettlement = (employeeId: number, data: any) =>
  api.post(`/hr/final-settlements/${employeeId}`, data).then((r) => r.data);

// 14. RBAC Roles & Permissions
export const fetchRoles = () => api.get("/hr/rbac/roles").then((r) => r.data);
export const fetchPermissions = () => api.get("/hr/rbac/permissions").then((r) => r.data);
export const assignRoleToEmployee = (employeeId: number, roleId: number) =>
  api.post("/hr/rbac/assign-role", { employeeId, roleId }).then((r) => r.data);
export const updateRolePermissions = (roleId: number, permissionIds: number[]) =>
  api.put(`/hr/rbac/roles/${roleId}/permissions`, { permissionIds }).then((r) => r.data);


