import React, { useContext } from "react";
import ReactPlayer from "react-player";

import {
  concepts,
  homeDescription,
  options,
  singersDescriptions,
} from "../config";
import { LangContext } from "@/contexts/LangContext";

import SingerCard from "@/components/SingerCard";
import { Link } from "react-router-dom";
import PhotoGrid from "@/components/PhotoGrid";
import ScrollingImages from "@/components/ScrollingImages";
import Concept from "@/components/Concept";

const HomePage = () => {
  const { lang } = useContext(LangContext);

  const text = homeDescription[lang];

  return (
    <div className="flex flex-col items-center">
      {/* Welcome video */}
      {/* <ReactPlayer
        url={"https://youtu.be/aXtZP_-frJ4"}
        height={500}
        width={"100vw"}
      /> */}
      {/* Title and description */}
      <div className="text-white text-center space-y-6 relative mb-6 w-full p-10">
        <img
          src="/assets/logo.png"
          className="absolute inset-0 w-full h-full object-contain opacity-10"
          alt="Logo Background"
        />
        <h1 className="text-6xl text-primary font-black ">{text.title}</h1>
        <p className="font-semibold">{text.p1}</p>
        <p className="font-semibold">{text.p2}</p>
        <p className="font-semibold">{text.p3}</p>
        <p className="font-semibold">{text.p4}</p>
      </div>
      {/* Artists */}
      <div className=" bg-white p-4 w-full text-center pb-10">
        <h2 className="font-bold text-3xl mb-6 text-primary">
          {lang === "en"
            ? "Our Artists"
            : lang === "fr"
            ? "Nos Artistes"
            : "האומנים שלנו"}
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar overflow-y-hidden">
          {singersDescriptions.map((item, index) => {
            return (
              <SingerCard
                key={index}
                name={item.name}
                imageSrc={item.imageSrc}
                role={item.role[lang]}
              />
            );
          })}
        </div>
      </div>
      {/* Concepts */}
      <div className="bg-background md:h-[500px] md:flex w-full p-4">
        <div className="h-full flex-[1_1_33.33%] flex flex-col items-center justify-center gap-4 lg:gap-10 text-white md:border-r-2 border-b-2 md:border-b-0">
          <h2 className="text-3xl lg:text-6xl font-bold">
            {lang === "he" ? "הרכבים" : "Formules"}
          </h2>
          <p className="border-2 p-2 lg:text-3xl mb-4 md:mb-0">
            {lang === "en"
              ? "Our Formules"
              : lang === "fr"
              ? "Nos Formules"
              : "ההרכבים שלנו"}
          </p>
        </div>
        <div className="text-white h-full flex-[2_1_66.67%] flex items-center overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          {concepts.map((item, index) => {
            return (
              <Link to={`/concept/${index}`}>
                <Concept
                  key={index}
                  isCard={true}
                  name={item.name}
                  imgSrc={item.imgSrc}
                  info={item.info}
                />
              </Link>
            );
          })}
        </div>
      </div>
      {/* Videos */}
      <div className="flex flex-col lg:flex-row items-center w-full p-4 bg-primary">
        <ReactPlayer
          url={"https://youtu.be/aXtZP_-frJ4"}
          height={500}
          width={"100%"}
        />
        <div className="bg-primary w-[30%] flex flex-col gap-6 justify-center items-center text-white">
          <h2 className="text-3xl lg:text-6xl font-bold">
            {lang === "he" ? "סרטונים" : "Videos"}
          </h2>
          <Link to={"/videos"} className="border-2 p-2 md:text-3xl text-center">
            {lang === "en"
              ? "Our Videos"
              : lang === "fr"
              ? "Nos Videos"
              : "הסרטונים שלנו"}
          </Link>
        </div>
      </div>
      {/* Photos */}
      <PhotoGrid />
      {/* Options */}
      <h2 className="pt-6 text-3xl lg:text-6xl text-center font-bold text-white mb-6">
        {lang === "he" ? "אופצוית" : "Options"}
      </h2>
      <Link
        to={"/options"}
        className="text-white mb-4 border-2 border-white p-4 lg:text-3xl"
      >
        {lang === "en" ? "Learn More" : lang === "fr" ? "Details" : "פרטים"}
      </Link>
      <div className="flex gap-6 flex-1 items-center bg-background p-4 pb-8 w-full  overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
        {options.map((item, index) => {
          return (
            <Link to={"/options"}>
              <div
                key={index}
                className="h-[400px] w-[250px] md:w-[500px] rounded-full relative"
              >
                <img
                  src={item.image}
                  className="h-full w-full object-cover rounded-lg lg:rounded-full "
                />
                <div className=" absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                  <h2 className="bg-primary text-white md:text-2xl font-bold p-4 rounded-full ">
                    {item[lang].name}
                  </h2>
                </div>
                {/* why do i need this for defining width */}
                <h1 className="w-[500px] bg-primary"></h1>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Scrolling Images */}
      <ScrollingImages />
    </div>
  );
};

export default HomePage;
