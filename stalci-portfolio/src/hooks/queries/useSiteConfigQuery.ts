import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfigMap } from "@/lib/api";

export function useSiteConfigQuery() {
  return useQuery<Record<string, string>>({
    queryKey: ["site-config-map"],
    queryFn: fetchSiteConfigMap,
    staleTime: 1000 * 60 * 15,
  });
}
