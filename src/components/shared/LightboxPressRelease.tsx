import Lightbox from "react-spring-lightbox";
import { FaX } from "react-icons/fa6";
interface LightboxProps {
    data: {title: string, link: string}[], 
    isOpen: boolean, 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    currentIndex: number
} 

const LightboxImage = ({ data = [], isOpen, setIsOpen, currentIndex }: LightboxProps) => {

    const transformedInfografisData = Array.isArray(data)
    ? data.map((item : {title: string, link: string}) => ({
        ...item,
        src: item.link,
        alt: item.link
      }))
    : [];

  return (
    <>
         <Lightbox
            isOpen={isOpen}
            onNext={()=> {}}
            onPrev={()=> {}}
            images={transformedInfografisData}
            currentIndex={currentIndex}
            renderHeader={() => (
                <div className="text-md sm:text-lg font-semibold flex w-full bg-black/20 justify-between px-3 py-1 items-center">
                    <button 
                    className="bg-transparent text-white text-md p-3 rounded-md transition duration-200 ease-in-out 
                                hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" 
                    onClick={() => { setIsOpen(false); }}
                    >
                        <FaX />
                    </button>

                </div>
            )}
            renderFooter={() => (
                <div className="flex w-full bg-black/20 text-white px-3 py-2 items-center flex-col">
                    <div className="mt-2 w-full max-h-32 overflow-y-auto px-2 py-1 rounded-md">
                        <p className="text-md text-center leading-relaxed">
                          
                        </p>
                    </div>
                </div>
            )}
            className="bg-black/80 text-white z-50"
        />
    </>
  );
};


export default LightboxImage;