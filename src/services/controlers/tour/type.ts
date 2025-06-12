import { Meta } from "@/types/meta";

export type TourData = {
    id: number;
    user_id: number,    
    title: string,
    description: string,
    link: {
        sosmed: {
            key: string,
            value: string,
        }[],
        email: string,
        website: string,
        gmap: string,
    },
    address: string,
    thumbnail: string | undefined,
    latitude: string,
    longitude: string,
    slug: string,
    published_at: string | null | undefined,
    meta: {
      key: string; 
      value: string | string[]; 
    }[];
}

export type ListTour = {
  data: TourData[];
  meta: Meta
}