import { useMutation } from "@tanstack/react-query";
import { submitInquiry } from "@/lib/api";
import { InquiryPayload } from "@/types/contact";

export function useInquiryMutation() {
  return useMutation({
    mutationFn: (data: InquiryPayload) => submitInquiry(data),
  });
}
