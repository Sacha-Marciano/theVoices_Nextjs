"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { LangContext } from "../contexts/LangContext";

const PhotoGrid = () => {
  const { lang } = useContext(LangContext);

  return (
    <div className="w-full relative flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 right-0 p-6 flex flex-col items-center justify-center gap-4 text-primary z-10 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          <span className="bg-white/80 px-4 py-1 rounded-xl">
            {lang === "en" ? "Gallery" : lang === "fr" ? "Galerie" : "גלריה"}
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full z-0">
        {new Array(25).fill(null).map((img, index) => (
          <div key={index} className="relative group h-32 sm:h-40 md:h-44 lg:h-48 w-full overflow-hidden rounded-2xl shadow-md">
            <img
              src={`assets/pics/${index + 1}.jpg`}
              alt={`Event photo ${index + 1}`}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/30 transition-all duration-300 rounded-2xl pointer-events-none" />
          </div>
        ))}
      </div>
      <Link
        href="/pictures"
        className="mt-6 bg-gold text-background font-bold px-6 py-2 rounded-full shadow hover:bg-primary hover:text-white transition z-20"
      >
        {lang === "en" ? "See All Photos" : lang === "fr" ? "Voir toutes les photos" : "לכל התמונות"}
      </Link>
    </div>
  );
};

export default PhotoGrid; 