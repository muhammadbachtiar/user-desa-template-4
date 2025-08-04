"use client"

import SliderCard from "../shared/sliderInfografis";

export default function Infografis({slideToShow = 4}) {

    return (
      <section className="relative w-full flex justify-center items-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl relative grid grid-cols-9 gap-2 dark:bg-gray-700 dark:border-gray-600">
            <div className="pt-6 col-span-9 max-w-full w-full justify-center overflow-hidden dark:bg-gray-800 dark:border-gray-700">                  
              <SliderCard slideToShow={slideToShow} />
            </div>
        </div>
      </section>
    );
  }
  