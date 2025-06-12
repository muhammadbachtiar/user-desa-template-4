"use client"

import SliderCard from "../shared/sliderInfografis";

export default function Infografis({slideToShow = 4}) {

    return (
      <section className="relative w-full max-w-11/12 flex justify-center items-center">
        <div className="max-w-full w-full grid grid-cols-9 gap-2 dark:bg-gray-700 dark:border-gray-600">
            <div className="pt-6 col-span-9 max-w-full w-full justify-center overflow-hidden dark:bg-gray-800 dark:border-gray-700">                  
              <SliderCard slideToShow={slideToShow} />
            </div>
        </div>
      </section>
    );
  }
  