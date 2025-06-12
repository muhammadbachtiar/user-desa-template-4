import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa6';
import { BiRightArrow } from 'react-icons/bi';

interface Props {
  thumbnail: string;
  title: string;
  slug: string;
  category_name: string;
  published_at: string;
  description: string;
  isVerified: boolean;
  waNumber: string;
}

export default function EnterpriseCard({
  thumbnail,
  title,
  slug,
  category_name,
  isVerified,
  waNumber,
  published_at,
  description,
}: Props) {
  return (
      <div className="group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out hover:shadow-lg rounded-lg bg-gray-50">
        <div className="relative overflow-hidden rounded-lg w-full h-60 group shadow-md group-hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {thumbnail && (
            <Image
              className="w-full h-full object-cover transform group-hover:scale-110 group-focus:scale-110 transition duration-300 ease-in-out"
              src={thumbnail}
              width={500}
              height={500}
              alt={`${title} Thumbnail`}
              priority 
            />
          )}
          {isVerified && (
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>
        <div className="p-4 dark:bg-gray-800 rounded-b-lg">
          <div className="flex flex-row items-center my-2 gap-2">
            <span className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
              {category_name}
            </span>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {published_at}
            </span>
          </div>
          <h5 className="my-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
            {title}
          </h5>
          <p className="mb-3 text-sm leading-6 text-gray-600 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
          <div className="flex justify-between items-center gap-4 mt-4">
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
              className="flex items-center gap-2 bg-[#25D366] text-white dark:text-white hover:bg-green-50 hover:text-black dark:hover:bg-green-900/20 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Contact</span>
            </a>
            <Link
              href={`/enterprise/${slug}`}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <span>Lihat Detail</span>
              <BiRightArrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
  );
}