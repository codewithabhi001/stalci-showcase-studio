import { services as staticServices, products as staticProducts, industries as staticIndustries, type DetailEntry } from "./site-data";
import { Cpu, Bot, Settings } from "lucide-react";

export function mapService(apiService: any): DetailEntry {
  const staticMatch = staticServices.find((s) => s.slug === apiService.slug);
  return {
    slug: apiService.slug,
    icon: staticMatch?.icon || Cpu,
    title: apiService.name || staticMatch?.title || "Service",
    tag: staticMatch?.tag || "IT",
    summary: apiService.description || staticMatch?.summary || "",
    overview: staticMatch?.overview || apiService.description || "",
    capabilities: staticMatch?.capabilities || [],
    deliverables: staticMatch?.deliverables || [],
    stack: staticMatch?.stack || [],
    outcomes: staticMatch?.outcomes || [],
  };
}

export function mapProduct(apiProduct: any): DetailEntry {
  const staticMatch = staticProducts.find((p) => p.slug === apiProduct.slug);
  return {
    slug: apiProduct.slug,
    icon: staticMatch?.icon || Bot,
    title: apiProduct.name || staticMatch?.title || "Product",
    tag: staticMatch?.tag || "Platform",
    summary: apiProduct.description || staticMatch?.summary || "",
    overview: staticMatch?.overview || apiProduct.description || "",
    capabilities: staticMatch?.capabilities || [],
    deliverables: staticMatch?.deliverables || [],
    stack: staticMatch?.stack || [],
    outcomes: staticMatch?.outcomes || [],
  };
}

export function mapIndustry(apiIndustry: any): DetailEntry {
  const staticMatch = staticIndustries.find((i) => i.slug === apiIndustry.slug);
  return {
    slug: apiIndustry.slug,
    icon: staticMatch?.icon || Settings,
    title: apiIndustry.name || staticMatch?.title || "Industry",
    tag: staticMatch?.tag || "Sector",
    summary: apiIndustry.description || staticMatch?.summary || "",
    overview: staticMatch?.overview || apiIndustry.description || "",
    capabilities: staticMatch?.capabilities || [],
    deliverables: staticMatch?.deliverables || [],
    stack: staticMatch?.stack || [],
    outcomes: staticMatch?.outcomes || [],
  };
}
