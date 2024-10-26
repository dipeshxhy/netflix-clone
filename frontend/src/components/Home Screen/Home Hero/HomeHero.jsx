import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../../utils/constants";
import { useContentStore } from "../../../store/content";
import MovieSlider from "../../Movie Slider/MovieSlider";
const HomeHero = () => {
  const { trendingContent } = useGetTrendingContent();
   const[imgLoading,setImgLoading]= useState(true)
 const {contentType}= useContentStore()
  if (!trendingContent )
    return (
      <div className="relative h-screen w-full text-white ">

        <div className="absolute top-0 left-0 h-full w-full bg-black/70 flex justify-center items-center -z-20 shimmer" />
      </div>
    );

  return (
    <div className=" relative">
      <div className="absolute bg-black top-0 z-10">
        {
          imgLoading &&(
        <div className="absolute top-0 left-0 h-full w-full bg-black/70 flex justify-center items-center -z-20 shimmer" />

          )
        }
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt=""
          className="object-cover w-full h-[50vh] md:h-full "
          onLoad={()=>setImgLoading(false)}
        />
        <div
          className="absolute bg-home-hero bg-black/40 h-full w-full top-0 left-0 z-0"
          aria-hidden="true"
        >
          <div className="container relative sm:top-[45vh]  top-[20vh] ">
            <h1 className="md:text-3xl text-xl font-bold">
              {trendingContent?.title || trendingContent?.original_name}
            </h1>
            <p className="text-sm">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}{" "}
            </p>
            <p className="md:text-lg text-gray-300 py-3  ">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
            <div className="space-x-4 flex items-center mt-2   ">
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="bg-white text-black px-4 py-2 hover:bg-white/80 rounded-sm "
              >
                <Play className="size-6 cursor-pointer  fill-black inline-block" />
                <span className="text-lg font-medium"> play</span>
              </Link>
              <Link
                to={`/watch/${trendingContent?.id }`}
                className="bg-gray-600 text-white px-4 py-2  hover:bg-gray-600/80 rounded-sm "
              >
                <Info className="size-6 cursor-pointer   inline-block" />
                <span className="text-lg font-medium "> More Info</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
      <div className="bg-black relative md:top-[670px] top-[500px] text-white ">

{
  contentType==="movie" ?(
    MOVIE_CATEGORIES.map(category=><MovieSlider key={category} category={category} />)

  ):(
    TV_CATEGORIES.map(category=><MovieSlider key={category} category={category} />)

  )

}
      </div>
    </div>
  );
};

export default HomeHero;
