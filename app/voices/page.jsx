"use client"
import { singersDescriptions, theVoicesDescription } from "../config";
import { LangContext } from "../contexts/LangContext";
import React, { useContext } from "react";
import SingerCard from "../components/SingerCard";

const VoicesPage = () => {
  const { lang } = useContext(LangContext);
  const text = theVoicesDescription[lang];
  return (
    <main className="bg-background min-h-[80vh] flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center min-h-[40vh] max-h-[60vh] overflow-hidden">
        <img
          src="/assets/pics/2.jpg"
          className="w-full h-full object-cover object-center opacity-60"
          alt="The Voices group event"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background/60 to-background/90">
          <h1 className="text-4xl md:text-6xl font-black text-gold drop-shadow-lg text-center">{text.title}</h1>
        </div>
      </section>
      {/* Intro Section */}
      <section className="w-full bg-white py-8 px-4 flex flex-col items-center">
        <div className="max-w-3xl text-center space-y-4 font-semibold text-background">
          {[text.p1, text.p2, text.p3, text.p4, text.p5, text.p6].map((p, i) => p && <p key={i}>{p}</p>)}
        </div>
      </section>
      {/* Singers Grid */}
      <section className="w-full py-10 px-4 bg-background flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gold mb-8 text-center">{lang === "en" ? "Meet the Voices" : lang === "fr" ? "Rencontrez les Voix" : "הכירו את הלהקה"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {singersDescriptions.map((item, index) => (
            <SingerCard key={index} name={item.name} imageSrc={item.imageSrc} role={item.role[lang]} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default VoicesPage;
