export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  published: boolean;
  createdAt: string;
  authorName?: string;
  content: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
