import React from "react";
import Hero from "../../components/hero/Hero";
import Card from "../../components/moviecard/Card";
import Footer from "../../components/footer/Footer";

const AuthScreen = () => {
  return (
    <div className="bg-black relative text-white">
      <Hero />
      <div className="separator"></div>
      <Card
        title="Enjoy on your Tv"
        desc="Watch on smart Tvs, playStation,Xbox,ChromeCast ,Apple TV,Blu-ray players, and more."
          image="/tv.png"
            video="/hero-vid.m4v"
      />
      <div className="separator"></div>

      <Card
        reverse={true}
        title="Download your shows to watch offline"
        desc="Save your favourite easily and always have something to watch"
           image="/mobile.png"
           download={true}
      />
      <div className="separator"></div>

      <Card
        title="Watch everywhere"
        desc="Stream unlimited movies and TV shows on your phone, tablet,laptop, and TV" 
        image="/device-pile.png"
        video="/device-pile.m4v"
      />
        <div className="separator"></div>
         <Card
        reverse={true}
        title="Create profiles for Kids"
        desc="Send kids on adventure with their favourite characters in a space made just for them-free with your membership."
        image="/kids.png"
      />
        <div className="separator"></div>

    </div>
  );
};

export default AuthScreen;
