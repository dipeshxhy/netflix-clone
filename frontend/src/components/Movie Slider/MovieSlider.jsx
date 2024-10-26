import React, { useEffect, useRef, useState } from "react";
import { useContentStore } from "../../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
    const [content,setContent]=useState(null)
    const[showArrow,setShowArrow]=useState(false)
    const sliderRef=useRef(null)
  const { contentType } = useContentStore();
  const formattedCategory =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(()=>{
  const  getContent=async()=>{
const res=await axios.get(`/api/${contentType}/${category}`)
setContent(res.data.content)
    }
    getContent()
  },[contentType,category])

  const scrollLeft=()=>{
    if(sliderRef.current){
        sliderRef.current.scrollBy({
            left:-sliderRef.current.offsetWidth,behavior:"smooth"
        })
    }
  }
  const scrollRight=()=>{
    if(sliderRef.current){
        sliderRef.current.scrollBy({
            left:sliderRef.current.offsetWidth,behavior:"smooth"
        })
    }
  }
  return (
    <div className="relative " onMouseEnter={()=>setShowArrow(true)} onMouseLeave={()=>setShowArrow(false)}>
       
        <div className="py-2 md:py-14 container relative"   >
        <h1 className="md:text-2xl text-xl font-extrabold">
          {formattedCategory} {formattedContentType}{" "}
        </h1>
      </div>
      <div ref={sliderRef} className="flex  space-x-2 container  overflow-hidden ">
        {
            content && content.map(item=>(
                <Link to={`/watch/${item.id}`} className="  min-w-[240px]   relative group">
                    <div className=" rounded-lg overflow-hidden">
<img src={SMALL_IMG_BASE_URL+item.backdrop_path } alt="movie image" className={`  transition-transform duration-300 ease-in-out group-hover:scale-125`} />
                    </div>
                    <p className="mt-2 font-bold  text-center">
                        {item.title || item.name}
                    </p>
                     </Link>
            ))
            
        }
         
      </div>
      {
        showArrow && (
            <>
            <button 
            className={`absolute -left-12 top-1/2 md:mt-12 ml-20 mt-0  -translate-y-1/2 md:left-20 flex items-center justify-center size-10 rounded-full bg-black hover:bg-opacity-75 text-white z-10`}
            onClick={scrollLeft}
            >

            <ChevronLeft size={20} className="" />
            </button>
            <button 
            className={`absolute  top-1/2 -right-5 md:mt-12 mr-10 mt-0   -translate-y-1/2 md:right-20 flex items-center justify-center size-10 rounded-full bg-black hover:bg-opacity-75 text-white z-10`}
            onClick={scrollRight}

            >

            <ChevronRight size={20} className="" />
            </button>
            
            </>
        )
     }
   
        </div>
     
    
  );
};

export default MovieSlider;
