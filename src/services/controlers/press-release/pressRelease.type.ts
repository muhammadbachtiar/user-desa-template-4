
import { CategoryData } from "@/services/controlers/category/type";
import { Meta } from "@/types/meta";

export type PressReleaseType = {
  id: number;
  title: string;
  description: string;
  slug: string;
  content: string;
  category_id: string;
  category: CategoryData,
  status: string;
  published_at: string;
  user: {
    name: string
  }
  thumbnail: string;
  meta: Meta[] | [];
  attachments: ({ url: string, original_name: string })[];
  village_id: number,
};

export type ListPressRelease = {
  data: PressReleaseType[];
  meta: Meta
}
