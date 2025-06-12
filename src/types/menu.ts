export type MenuForm = {
    order: number
    title: string
    route?: string
    staticPages?: string | null
    child?: MenuForm[]
  }[]
  
  export interface PageContent {
    html: string
    title?: string
    metadata?: Record<string, string | string[]>
  }

  export type MenuItem = {
    order: number;
    title: string;
    route?: string;
    staticPage?: string | null;
    child?: MenuItem[] | null;
  };

  export type MenuWithContent = MenuItem[];
  
  export interface ContentResponse {
    content: string
    title: string
  }
  