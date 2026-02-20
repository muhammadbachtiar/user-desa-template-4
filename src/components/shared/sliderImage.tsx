"use client";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "next/image";
import { CSSProperties, useState } from "react"
import React from "react";
import LightboxImage from "./LightboxPressRelease";

interface SliderCardProps {
    useButton?: boolean;
    useDots?: boolean; 
    slideToShow: number
    data: {title: string, link: string}[]
  }

interface SliderButtonProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
    
  }

const SliderCard = ({useButton = false, useDots= false, slideToShow = 4, data=[]}: SliderCardProps) => {
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
    
let settings
  
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
          initialSlide: 2
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
        <div className="w-full">
            <Slider {...settings}>
             {
               data.map((card: {title: string, link: string}, index:number) => {
                      return (
                       <div key={card.title} tabIndex={1} onClick={() => { setIsOpen(true); setCurrentIndex(index); }} >
                          <div className="relative px-2 lg:px-3 group transition duration-300 ease-in-out hover:scale-105">
                            <div className="relative flex justify-center overflow-hidden w-full aspect-square">
                              <Image
                                className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:brightness-110 group-hover:shadow-lg"
                                src={card.link?.startsWith("https:/") ? card.link : '/images/not-found-image.jpg'}
                                alt={`Infografis ${card.title}`}
                                width={500}
                                height={500}
                              />
                            </div>
                          </div>
                        </div>     
                       )
                    }
                  )
             }
          </Slider>
          <LightboxImage data={data} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
        </div>
      )
}

export default SliderCard;