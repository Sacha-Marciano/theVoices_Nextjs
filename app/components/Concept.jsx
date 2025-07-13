"use client";
import { LangContext } from "../contexts/LangContext";
import React, { useContext } from "react";

const Concept = ({ isCard, name, imgSrc, info, onClick }) => {
  const { lang } = useContext(LangContext);

  if (isCard) {
    return (
      <div 
        className="relative flex flex-col items-center w-64 h-80 bg-white rounded-3xl shadow-lg border-2 border-gold overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group focus-within:ring-4 focus-within:ring-gold" 
        tabIndex={0} 
        aria-label={name[lang]}
        onClick={onClick}
      >
        <img
          src={imgSrc}
          alt={name[lang]}
          className="w-full h-44 object-cover rounded-t-3xl group-hover:brightness-90 transition-all duration-300"
        />
        <div className="flex-1 flex flex-col justify-center items-center p-4 w-full">
          <h1 className="text-xl font-extrabold text-primary text-center mb-2">{name[lang]}</h1>
          <p className="text-background text-center text-sm line-clamp-3 group-hover:line-clamp-none group-hover:text-gold transition-all duration-300">
            {info && info[0] && info[0].title && info[0].title[lang]}
          </p>
        </div>
        <span className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-primary transition-all pointer-events-none" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col  w-full text-white p-4  justify-center gap-8">
         <h1 className="border-b-4 border-b-primary font-extrabold text-4xl p-4 text-primary bg-white rounded-xl mb-4 text-center">
            {name[lang]}
          </h1>
          <div className="flex">
        <div className="w-full lg:w-[60%] max-w-xl h-96 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-3xl shadow-lg bg-background">
          <img
            src={"../" + imgSrc}
            alt="Concept photo"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full p-4 flex-1">
         
          {info.map((item, index) => {
            return (
              <div key={index} className="p-2">
                <h2 className=" text-primary font-bold">{item.title?.[lang]}</h2>
                {item.description?.[lang] && (
                  Array.isArray(item.description[lang]) ? 
                    item.description[lang].map((desc, descIndex) => {
                      return <p key={descIndex}>{desc}</p>;
                    })
                    :
                    <p>{item.description[lang]}</p>
                )}
              </div>
            );
          })}
        </div>

        </div>
      </div>
    );
  }
};

export default Concept; 