import { useQuery } from "@tanstack/react-query";
import { fetchTechnologies } from "@/lib/api";

export function useTechStackQuery(category?: string) {
  return useQuery({
    queryKey: ["technologies", category],
    queryFn: () => fetchTechnologies(category),
    staleTime: 1000 * 60 * 10,
  });
}
