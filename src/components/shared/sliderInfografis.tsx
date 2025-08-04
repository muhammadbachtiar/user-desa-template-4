"use client";

import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "next/image";
import { CSSProperties, useState } from "react"
import React from "react";
import LightboxImage from "./Lightbox";
import useInfografis from "@/hooks/contents/infografis/useInfografis";
import Refetch from "./refetch";
import { Infografis } from "@/services/controlers/infografis/type";

interface SliderCardProps {
    useButton?: boolean;
    useDots?: boolean; 
    slideToShow: number
  }

interface SliderButtonProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
  }

const SliderCard = ({useButton = false, useDots= false, slideToShow = 4}: SliderCardProps) => {
  const { data, isLoading, isFetching, refetch, isError } = useInfografis();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
function SampleNextArrow(props: SliderButtonProps) {
    const { className, style, onClick } = props;
    
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
    );
}
      
function SamplePrevArrow(props: SliderButtonProps) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
      );
}  
    
let settings;
  
settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  nextArrow: !useButton ? <SampleNextArrow /> : undefined,
  prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
  ...(useDots && {
      appendDots: (dots: React.ReactNode) => (
        <div
          style={{
            position: 'unset',
            padding: "0 10px"
          }}
        >
          <ul style={{ margin: "0px" }}>{dots}</ul>
        </div>
      )
    }
  )
};

if(slideToShow > 1){
  settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 664,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: !useButton ? <SampleNextArrow /> : undefined,
    prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
    ...(useDots && {
        appendDots: (dots: React.ReactNode) => (
          <div
            style={{
              position: 'unset',
              padding: "0 10px"
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        )
      }
    )
  }
}

if(slideToShow > 3){
  settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 4,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: !useButton ? <SampleNextArrow /> : undefined,
    prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
    ...(useDots && {
        appendDots: (dots: React.ReactNode) => (
          <div
            style={{
              position: 'unset',
              padding: "0 10px"
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        )
      }
    )
  }
}

SamplePrevArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};

SampleNextArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};
  
return (
        <div className="min-h-full w-full">
            <Slider {...settings}>
              {
                isLoading || isFetching && (!data || Array.isArray(data) && data.length === 0) ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="relative px-3 animate-pulse">
                      <div className=" w-80 flex-1 rounded-2xl bg-gray-200"></div>
                    </div>
                ))
                ) : !isError && !isFetching && (!data || Array.isArray(data) && data.length === 0) ? (
                    <div className="mb-4 col-span-8 w-full">
                      <p className="text-black text-md min-h-52 flex items-center justify-center dark:text-gray-400">Infografis tidak tersedia</p>
                    </div>
                ) : isError && !isFetching  ? (
                    <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                      <Refetch  refetch={refetch} />
                    </div>
                ) : (
                  data.map((card: Infografis, index:number) => {
                      return (
                         <div className=" min-h-full" key={card.slug} onClick={() => {setIsOpen(true); setCurrentIndex(index)}}>
                          <div className="relative min-h-full p-1 group border-2 border-white hover:border-[#850000] rounded-2xl transition duration-300 ease-in-out ">
                            <div className="relative flex justify-center overflow-hidden w-full rounded-t-2xl shadow-lg">
                              <div className="relative flex justify-center overflow-hidden w-full group rounded-t-2xl aspect-[4/5]">
                                <Image
                                    className="w-full object-cover"
                                    src={card.link?.startsWith("https:/") ?  card.link : '/images/not-fuound-image.jpg'}
                                    alt={`Infografis ${card.title}`}
                                    width={500}
                                    height={889}
                                  />
                              </div>
                            </div>
                             <div className="p-3 md:p-6 text-black bg-gray-50 rounded-b-2xl">
                                <h5 className="text-lg md:text-xl font-bold mb-2 leading-tight line-clamp-2">
                                  {card.title}
                                </h5>
                                <p className="text-sm opacity-90 line-clamp-2 leading-relaxed">
                                  {card.description}
                                </p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  )
                )
               }
          </Slider>
          <LightboxImage data={data} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
        </div>
      )
}

export default SliderCard;