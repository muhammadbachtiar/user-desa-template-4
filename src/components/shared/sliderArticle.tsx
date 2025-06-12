"use client";

import Slider from "react-slick";
import PropTypes from "prop-types";
import ArticleCard from "./articleCard";
import { CSSProperties } from "react"
import useArticle from "@/hooks/contents/article/useList";
import { ArticleData } from "@/services/controlers/article/type";
import Refetch from '../shared/refetch';

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
  let isInfinite = false
  const { data: articles, isLoading, isFetching, refetch, isError } = useArticle({"page_size": 6});
  
  if(!isLoading && !isFetching && !isError){
    isInfinite = (articles?.pages?.[0]?.data?.length ?? 0) > 1
  }

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
    infinite: isInfinite,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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
            <Slider {...settings}>
               {
                isLoading || (isFetching &&  (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0))  ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex px-3 animate-pulse w-full">
                      <div className="h-64 w-full flex-1 rounded-2xl bg-gray-200"></div>
                    </div>
                ))
                ) : !isError && !isFetching &&  (!articles || !articles.pages[0] || articles.pages[0]?.data.length === 0) ? (
                  <div className="flex justify-center items-center w-full">
                    <div className="flex h-52 justify-center items-center w-full">
                      <p className="text-black text-center text-md dark:text-gray-400">Artikel tidak tersedia</p>
                  </div>
                </div>
                ) : isError && !isFetching  ? (
                    <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
                      <Refetch  refetch={refetch} />
                    </div>
                ) : (
                    articles?.pages[0].data.map((card: ArticleData) => 
                      <div tabIndex={1} key={card.slug}>
                          <ArticleCard thumbnail={card.thumbnail} slug={card.slug} title={card.title} description={card.description} category_name={card.category.name} published_at={card.published_at} /> 
                      </div>    
                    )
                )
               }
            </Slider>
        </div>
      )
}

export default SliderCard;