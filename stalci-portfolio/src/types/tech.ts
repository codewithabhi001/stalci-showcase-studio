export interface TechTool {
  name: string;
  category: string;
  iconSlug: string;
  level: string;
  description: string;
}

export interface TechCategoryGroup {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: TechTool[];
}
