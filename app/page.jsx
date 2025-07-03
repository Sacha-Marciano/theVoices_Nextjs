"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { concepts, homeDescription, options, singersDescriptions } from "./config";
import { LangContext } from "./contexts/LangContext";
import SingerCard from "./components/SingerCard";
import PhotoGrid from "./components/PhotoGrid";
import ScrollingImages from "./components/ScrollingImages";
import Concept from "./components/Concept";

export default function Home() {
  const { lang } = useContext(LangContext);
  const text = homeDescription[lang];

  return (
    <main className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-[60vh] bg-background overflow-hidden py-12 px-4 text-center">
        <img src="/assets/logo.png" alt="The Voices Logo" className="z-10 relative w-40 md:w-60 mb-4 mx-auto" />
        <h1 className="z-10 relative text-4xl md:text-6xl font-black text-primary mb-4 drop-shadow-lg">{text.title}</h1>
        <p className="z-10 relative text-lg md:text-2xl text-white font-semibold mb-6 max-w-2xl mx-auto">{text.p1}</p>
        <Link href="/contacts" className="z-10 relative inline-block bg-gold text-background font-bold text-xl md:text-2xl px-8 py-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition">{lang === "en" ? "Book Us" : lang === "fr" ? "Réservez-nous" : "הזמינו אותנו"}</Link>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/80 to-gold/20 pointer-events-none" />
      </section>

      {/* About/Intro Section */}
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-6 py-8 px-4 bg-white">
        <div className="flex-1 flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">{lang === "en" ? "Who Are We?" : lang === "fr" ? "Qui sommes-nous ?" : "מי אנחנו?"}</h2>
          <p className="text-background text-lg font-medium max-w-xl text-center">{text.p2}</p>
        </div>
        <div className="flex-1 flex flex-row gap-4 justify-center">
          {/* Example highlight cards, replace with real stats if available */}
          <div className="bg-gold text-background rounded-xl shadow-lg px-6 py-4 font-bold text-xl flex flex-col items-center">
            <span>10+</span>
            <span className="text-sm font-medium">{lang === "en" ? "Years Experience" : lang === "fr" ? "Années d'expérience" : "שנות ניסיון"}</span>
          </div>
          <div className="bg-primary text-white rounded-xl shadow-lg px-6 py-4 font-bold text-xl flex flex-col items-center">
            <span>200+</span>
            <span className="text-sm font-medium">{lang === "en" ? "Events" : lang === "fr" ? "Événements" : "אירועים"}</span>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="w-full bg-white py-10 px-4 text-center">
        <h2 className="font-bold text-3xl mb-6 text-primary">
          {lang === "en" ? "Our Artists" : lang === "fr" ? "Nos Artistes" : "האמנים שלנו"}
        </h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {singersDescriptions.map((item, index) => (
            <SingerCard key={index} name={item.name} imageSrc={item.imageSrc} role={item.role[lang]} />
          ))}
        </div>
      </section>

      {/* Recent Events/Concepts Section */}
      <section className="w-full bg-background py-10 px-4">
        <h2 className="text-3xl font-bold text-gold mb-6 text-center">{lang === "en" ? "Recent Events" : lang === "fr" ? "Événements Récents" : "אירועים אחרונים"}</h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {concepts.slice(0, 4).map((item, index) => (
            <Link href={`/concept/${index}`} key={index}>
              <Concept isCard={true} name={item.name} imgSrc={item.imgSrc} info={item.info} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/concept" className="text-gold hover:text-primary font-bold text-lg underline">{lang === "en" ? "See All Events" : lang === "fr" ? "Voir tous les événements" : "לכל האירועים"}</Link>
        </div>
      </section>

      {/* Videos Section */}
      <section className="w-full bg-primary py-10 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-6">{lang === "en" ? "Videos" : lang === "fr" ? "Vidéos" : "סרטונים"}</h2>
        <div className="w-full max-w-3xl aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/aXtZP_-frJ4"
            title="The Voices"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <Link href="/videos" className="bg-gold text-background font-bold px-6 py-2 rounded-full shadow hover:bg-white hover:text-primary transition">{lang === "en" ? "See More Videos" : lang === "fr" ? "Voir plus de vidéos" : "עוד סרטונים"}</Link>
      </section>

      {/* Photos Section */}
      <section className="w-full bg-white py-10 px-4">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">{lang === "en" ? "Photos" : lang === "fr" ? "Photos" : "תמונות"}</h2>
        <PhotoGrid />
      </section>

      {/* Options Section */}
      <section className="w-full bg-background py-10 px-4">
        <h2 className="text-3xl font-bold text-gold mb-6 text-center">{lang === "en" ? "Options" : lang === "fr" ? "Options" : "אופציות"}</h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {options.map((item, index) => (
            <Link href="/options" key={index}>
              <div className="h-[300px] w-[220px] md:w-[320px] rounded-2xl overflow-hidden shadow-lg relative group bg-white">
                <img src={item.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-white text-center py-3 text-lg font-bold">{item[lang].name}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/options" className="text-gold hover:text-primary font-bold text-lg underline">{lang === "en" ? "Learn More" : lang === "fr" ? "Détails" : "פרטים"}</Link>
        </div>
      </section>

      {/* Scrolling Images Section */}
      <section className="w-full bg-background py-8">
        <ScrollingImages />
      </section>
    </main>
  );
}
