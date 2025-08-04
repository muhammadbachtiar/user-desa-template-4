import Image from "next/image";
import Link from "next/link";
interface Props {
    thumbnail: string | null; 
    title: string;
    slug: string;
    category_name: string;
    published_at: string | null;
    description: string;
  }

export default function ArticleCard({thumbnail, title, slug, category_name, published_at, description}: Props) {
  return (
    <Link href={`/article/${slug}`} tabIndex={1} className="col-span-6 md:col-span-3 px-3 md:px-0 lg:col-span-2 w-full">
      <div className="group hover:scale-105 focus:scale-105 transition duration-300 ease-in-out">
        <div className="relative rounded-2xl px-2 py-3 h-full min-h-[400px] flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <span className="text-sm font-medium text-gray-700">{published_at}</span>
          </div>
          <div className="line-clamp-3 mb-2 min-h-24">
            <h2 className="text-2xl font-bold text-black leading-tight">{title}</h2>
          </div>
          <div className="line-clamp-4 md:line-clamp-3 mb-4 min-h-16">
            <p className="text-gray-700 text-sm  leading-relaxed flex-grow">{description}</p>
          </div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-[#850000]/90 rounded-full">
              {category_name}
            </span>
          </div>
          {thumbnail && (
            <div className="relative overflow-hidden rounded-lg w-full aspect-[16/9]">
              <Image
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={thumbnail || "/placeholder.svg"}
                fill
                alt="Article Thumbnail"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
