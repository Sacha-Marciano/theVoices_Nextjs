import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { LangContext } from "@/contexts/LangContext";
const PhotoGrid = () => {
  const { lang } = useContext(LangContext);

  return (
    <div className="w-full relative flex items-center justify-center">
      <div className="bg-[rgba(255,255,255,0.3)] absolute top-0 bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-center gap-6 text-primary">
        <h2 className="text-5xl md:text-8xl font-bold">
          {" "}
          {lang === "en" ? "Galery" : lang === "fr" ? "Galerie" : "גלריה"}
        </h2>
        <Link
          to={"/pictures"}
          className="border-2 md:border-4 border-primary p-1 md:p-2 text-xl md:text-3xl font-bold rounded-md bg-white"
        >
          {lang === "en" ? "Pictures" : lang === "fr" ? "Photos" : "תמונות"}
        </Link>
      </div>
      <div className="grid grid-cols-5 w-full">
        {new Array(25).fill(null).map((img, index) => (
          <div key={index} className="h-[145px] w-full">
            <img
              src={`assets/pics/${index + 1}.jpg`}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
