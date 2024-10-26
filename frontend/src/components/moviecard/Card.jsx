import React from "react";

const Card = ({ reverse, title, desc ,image,video,download}) => {
  return (
    <div>
      <div className="container py-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
          <div className={`space-y-2 ${reverse && "order-last"} `}>
            <h2 className="text-3xl font-extrabold ">
              {reverse ? title : title}
            </h2>
            <p className="text-lg md:text-xl"> {reverse ? desc : desc}</p>
          </div>
          {reverse ? (
            <div className="relative mb-14 md:order-first order-last ">
              <img src={image} alt="" className="  " />
              {
                download && (
                    <div className="absolute flex gap-2 z-10 top-1/2 w-3/5 lg:w-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-32 border bg-black rounded-md px-2 py-[10px] border-slate-300  ">
                    <img src="/stranger-things-sm.png" alt="" className="w-10 " />
    
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-md ">Stranger Things</h1>
                        <p className="text-sm text-blue-600">Downloading...</p>
                      </div>
                      <img src="/download-icon.gif" alt="" className="w-10 h-10" />
                    </div>
                  </div>
                )
              }
             
            </div>
          ) : (
            <div className="relative">
              <img src={image} alt="" className="relative z-50 " />
              <video
                className="absolute  top-0 size-[300px] left-20 "
                playsInline
                autoPlay={true}
                muted
                loop
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
