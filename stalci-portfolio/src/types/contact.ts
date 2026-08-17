export interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message?: string;
  id?: number | string;
}
