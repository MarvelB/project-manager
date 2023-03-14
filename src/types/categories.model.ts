export enum ProjectCategories {
    DEVELOPMENT = "development",
    DESIGN = "design",
    SALES = "sales",
    MARKETING = "marketing",
}

export interface ProjectCategorySelect {
    value: ProjectCategories[keyof ProjectCategories];
    label: string;
}