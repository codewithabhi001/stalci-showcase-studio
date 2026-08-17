import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/lib/api";
import { CoreService } from "@/types/service";
import { fallbackServices } from "@/data/mock-services";

export function useServicesQuery() {
  return useQuery<CoreService[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const apiServices = await fetchServices();
      if (!apiServices || apiServices.length === 0) {
        return fallbackServices;
      }
      return apiServices;
    },
    initialData: fallbackServices,
    staleTime: 1000 * 60 * 10,
  });
}
