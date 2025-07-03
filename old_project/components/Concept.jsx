import { LangContext } from "@/contexts/LangContext";
import React, { useContext } from "react";

const Concept = ({ isCard, name, imgSrc, info }) => {
  const { lang } = useContext(LangContext);

  if (isCard) {
    return (
      <div className=" h-full relative p-4 hover:scale-105 cursor-pointer transition-all w-[100vw] md:w-full">
        <h1 className="bg-primary p-1 font-bold rounded-t-md text-center">
          {name[lang]}
        </h1>
        <img
          src={imgSrc}
          className="h-[95%] w-[100%] object-cover border-b-8 border-b-primary rounded-b-md"
        ></img>
        {/* why do i need this for defining width */}
        <h1 className="w-[500px] bg-primary"></h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col lg:flex-row text-white p-4">
        <img
          src={"../" + imgSrc}
          alt="Concept photo"
          className="lg:w-[60%] object-cover"
        />
        <div className="w-full p-4">
          <h1 className="border-b-4 border-b-primary font-extrabold text-4xl p-4">
            {name[lang]}
          </h1>
          {info.map((item, index) => {
            return (
              <div key={index} className="p-2">
                <h2 className=" text-primary font-bold">{item[lang].title}</h2>
                {item[lang].description.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Concept;
