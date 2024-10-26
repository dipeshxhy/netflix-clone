import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../../store/content";
import axios from "axios";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import WatchPageSkeleton from "../../components/Skeleton/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const { contentType } = useContentStore();
  const [showArrow, setShowArrow] = useState(false);
  const sliderRef = useRef(null);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/trailers`);
        setTrailers(response.data.trailers);
      } catch (error) {
        if (error.response.status.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailer();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/similar`);
        setSimilarContent(response.data.similar);
      } catch (error) {
        if (error.response.status.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(`/api/${contentType}/${id}/details`);
        setContent(response.data.details);
      } catch (error) {
        if (error.response.status.includes("404")) {
          setContent(null);
          
        }
      } finally {
        setLoading(false);
      }
    };
  
    getContentDetails();
  }, [contentType, id]);

  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx((prev) => prev + 1);
    }
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  if (loading)
    return (
      <div className="h-full w-full p-10">
        <WatchPageSkeleton />
      </div>
    );

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };


  return (
    <div className="bg-black relative  ">
      <HomeNavbar />
      <div className="container    bg-black w-full">
        <div className="flex bg-black justify-between">
          <button
            className={`bg-gray-600/70 p-2 hover:bg-gray-600/80 ${
              currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentTrailerIdx === 0}
            onClick={handlePrev}
          >
            <ChevronLeft />
          </button>
          <button
            className={`bg-gray-600/70 p-2 hover:bg-gray-600/80 ${
              currentTrailerIdx === trailers.length - 1
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={currentTrailerIdx === trailers.length - 1}
            onClick={handleNext}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="aspect-video mt-4 mb-8 p-2 sm:px-10 md:px-12">
          {trailers.length > 0 ? (
            <ReactPlayer
              controls={true}
              className="mx-auto overflow-hidden rounded-xl"
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          ) : (
            <h2 className="text-xl text-center mt-5">
              No trailers available for
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>
        <div className="px-4 py-6 space-y-6 md:px-20 md:py-20">
          <div className="grid grid-cols-1 place-items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="md:text-2xl text-xl font-bold">
                {content?.title || content?.name}
              </h1>
              <p className="text-sm mt-1">
                {formattedDate(
                  content?.release_date || content?.first_air_date
                )}{" "}
                |{" "}
                <span
                  className={`font-bold ${
                    content.adult ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {content.adult ? "18+" : "PG-13"}
                </span>
              </p>
              <p className="mt-5">{content?.overview}</p>
            </div>
            <img
              src={ORIGINAL_IMG_BASE_URL + content.poster_path}
              alt="poster image"
              className="max-w-[200px] rounded-lg"
            />
          </div>
        </div>

        <div
          className="relative mt-8 "
          onMouseEnter={() => setShowArrow(true)}
          onMouseLeave={() => setShowArrow(false)}
        >
          <h1 className="text-2xl font-bold">Similar Movies / TV Shows</h1>
          <div
            ref={sliderRef}
            className="flex relative mt-10 space-x-2 overflow-hidden"
          >
            {similarContent.map((item) => {
              if (content.poster_path === null) return null;
              return (
                <Link
                  to={`/watch/${item.id}`}
                  key={item.id}
                  className="min-w-[160px] md:min-w-[240px] relative group"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={
                        ORIGINAL_IMG_BASE_URL +
                        (item.poster_path || item.backdrop_path)
                      }
                      alt="movie image"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                    />
                  </div>
                  <p className="mt-2 font-bold text-center">
                    {item.title || item.name}
                  </p>
                </Link>
              );
            })}
          </div>
          {showArrow && (
            <>
              <button
                className="absolute top-1/2 left-2 md:left-20 transform -translate-y-1/2 flex items-center justify-center rounded-full bg-red-600 hover:bg-opacity-65 text-white z-10 p-2"
                onClick={scrollLeft}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute top-1/2 right-2 md:right-20 transform -translate-y-1/2 flex items-center justify-center rounded-full bg-red-600 hover:bg-opacity-65 text-white z-10 p-2"
                onClick={scrollRight}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
