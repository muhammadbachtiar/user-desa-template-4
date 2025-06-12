"use client";

import Slider from "react-slick";
import PropTypes from "prop-types";
import EnterpriseCard from "./enterpriseCard";
import { CSSProperties } from "react"
import useEnterprise from "@/hooks/contents/enterprise/useList";

interface Enterprise {
    id: number;
    category_id: number;
    title: string;
    description: string;
    thumbnail: string;
    published_at: string; 
    slug: string;
    user_id: number;
    category: {name: string}
    isVerified: boolean,
    waNumber: string
  }

interface SliderCardProps {
    useButton?: boolean;
    useDots?: boolean; 
}

interface SliderButtonProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
  }

const SliderCard = ({useButton = false, useDots= false}: SliderCardProps) => {

  // const { data: enterprise, isLoading, isFetching, refetch, isError } = useEnterprise();
  const { data: enterprise } = useEnterprise();
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
    
const settings = {
    dots: true,
    infinite: enterprise.value.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 986,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
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
};

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
        <div>
            <Slider {...settings} >
            {enterprise.value.map((card: Enterprise) => 
              <div tabIndex={1} key={card.slug} className="px-4">
                  <EnterpriseCard thumbnail={card.thumbnail}isVerified={card.isVerified} waNumber={card.waNumber} slug={card.slug} title={card.title} description={card.description} category_name={card.category.name} published_at={card.published_at} /> 
              </div>    
            )}
          </Slider>
        </div>
      )
}

export default SliderCard;