"use client"

import React, { useContext, useState } from "react";
import { LangContext } from "../contexts/LangContext";

const PicturesPage = () => {
  const { lang } = useContext(LangContext);
  const [openImg, setOpenImg] = useState(false);
  const [imgToShow, setImgToShow] = useState(1);

  const pics = new Array(40).fill(null).map((_, index) => `assets/pics/${index + 1}.jpg`);

  return (
    <main className="min-h-[80vh] bg-background flex flex-col items-center w-full py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-black text-gold text-center mb-8 drop-shadow-lg">
        {lang === "en"
          ? "Our Pictures"
          : lang === "fr"
          ? "Nos Photos"
          : "התמונות שלנו"}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
        {pics.map((img, index) => (
          <button
            key={index}
            className="focus:outline-none focus:ring-4 focus:ring-gold rounded-2xl"
            onClick={() => {
              setImgToShow(index);
              setOpenImg(true);
            }}
            aria-label={`Open image ${index + 1}`}
          >
            <img
              src={img}
              alt={`Event photo ${index + 1}`}
              className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
      {/* Lightbox */}
      {openImg && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={() => setOpenImg(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="text-white font-bold text-4xl absolute top-6 right-10 hover:text-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
            onClick={(e) => { e.stopPropagation(); setOpenImg(false); }}
            aria-label="Close gallery"
          >
            ×
          </button>
          <div className="flex items-center justify-center w-full h-full">
            <button
              className="text-white font-bold text-4xl mr-4 hover:text-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
              onClick={(e) => { e.stopPropagation(); setImgToShow(imgToShow === 0 ? pics.length - 1 : imgToShow - 1); }}
              aria-label="Previous image"
            >
              &#8592;
            </button>
            <img
              src={pics[imgToShow]}
              alt={`Selected event photo ${imgToShow + 1}`}
              className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-lg border-4 border-gold bg-background"
            />
            <button
              className="text-white font-bold text-4xl ml-4 hover:text-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
              onClick={(e) => { e.stopPropagation(); setImgToShow(imgToShow === pics.length - 1 ? 0 : imgToShow + 1); }}
              aria-label="Next image"
            >
              &#8594;
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PicturesPage;
