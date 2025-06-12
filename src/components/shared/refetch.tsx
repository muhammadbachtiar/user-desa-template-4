
import { BiRefresh } from "react-icons/bi";

const Refetch = ({ refetch }: {refetch : ()=>void}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-black text-mb dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
            <button
                className="p-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 cursor-pointer "
                onClick={refetch}
            >
                <BiRefresh size={24} />
            </button>
        </div>
    );
};

export default Refetch;
