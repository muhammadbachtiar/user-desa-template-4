interface Props {
    title: string;
  }

export default function HeadingBadge({ title }: Props) {
  return (
    <div className="flex items-center">
        <div className="w-1.5 h-10 bg-blue-600 rounded-sm"></div>
        <div className="ml-4 px-2 md:px-6 py-2 bg-blue-50 w-full rounded-md">
            <h2 className="text-blue-700 font-bold md:font-semibold md:text-xl text-md tracking-wide uppercase">{title}</h2>
        </div>
    </div>
  );
}
