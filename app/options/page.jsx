"use client"

import React, { useContext, useState, useEffect } from "react";
import { LangContext } from "../contexts/LangContext";

const OptionsPage = () => {
  const { lang } = useContext(LangContext);
  const [optionToShow, setOptionToShow] = useState(0);
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/options")
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load options:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-[80vh] bg-background flex flex-col items-center w-full py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-black text-gold text-center mb-8 drop-shadow-lg">
        {lang === "en"
          ? "Our Options"
          : lang === "fr"
          ? "Nos Formules"
          : "האופציות שלנו"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {options.map((item, index) => (
          <button
            key={item._id || index}
            className="flex flex-col gap-4 items-center justify-center text-center bg-white p-6 rounded-3xl shadow-lg border-2 border-gold cursor-pointer min-h-[40vh] hover:scale-105 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
            onClick={() => {
              setOptionToShow(index);
              setOpenOption(true);
            }}
            aria-label={`Open option ${item.name[lang]}`}
          >
            <img
              src={item.image}
              alt={item.name[lang]}
              className="object-contain w-full h-40 rounded-2xl mb-2"
            />
            <div className="w-full">
              <h2 className="text-2xl font-bold text-primary mb-2">{item.name[lang]}</h2>
              <p className="text-background text-sm line-clamp-3">{item.description[lang]}</p>
            </div>
          </button>
        ))}
      </div>
      {/* Modal/Lightbox */}
      {openOption && options.length > 0 && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={() => setOpenOption(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="text-white font-bold text-4xl absolute top-6 right-10 hover:text-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
            onClick={(e) => { e.stopPropagation(); setOpenOption(false); }}
            aria-label="Close option details"
          >
            ×
          </button>
          <div className="flex items-center justify-center w-full h-full">
            <button
              className="text-white font-bold text-4xl mr-4 hover:text-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
              onClick={(e) => { e.stopPropagation(); setOptionToShow(optionToShow === 0 ? options.length - 1 : optionToShow - 1); }}
              aria-label="Previous option"
            >
              &#8592;
            </button>
            <div className="flex flex-col md:flex-row bg-background rounded-3xl shadow-lg border-4 border-gold p-6 max-w-3xl w-full items-center">
              <img
                src={options[optionToShow].image}
                alt={options[optionToShow].name[lang]}
                className="md:w-[300px] w-full h-48 object-cover rounded-2xl mb-4 md:mb-0 md:mr-6"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-gold font-bold text-3xl mb-4">{options[optionToShow].name[lang]}</h1>
                <p className="text-white text-lg">{options[optionToShow].description[lang]}</p>
              </div>
            </div>
            <button
              className="text-white font-bold text-4xl ml-4 hover:text-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
              onClick={(e) => { e.stopPropagation(); setOptionToShow(optionToShow === options.length - 1 ? 0 : optionToShow + 1); }}
              aria-label="Next option"
            >
              &#8594;
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default OptionsPage;
