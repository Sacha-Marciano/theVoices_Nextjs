"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { concepts, homeDescription } from "./config";
import { LangContext } from "./contexts/LangContext";
import SingerCard from "./components/SingerCard";
import PhotoGrid from "./components/PhotoGrid";
import ScrollingImages from "./components/ScrollingImages";
import Concept from "./components/Concept";
import ReactPlayer from "react-player";

function normalizeYouTubeUrl(url) {
  if (!url) return url;
  // youtu.be short links
  let match = url.match(/^https?:\/\/youtu\.be\/([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // youtube shorts
  match = url.match(/^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // youtube embed
  match = url.match(/^https?:\/\/(?:www\.)?youtube\.com\/embed\/([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // youtube watch (strip extra params)
  match = url.match(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  // fallback: strip params from any youtube url
  match = url.match(/([\w-]{11})/);
  if (/youtube\.com|youtu\.be/.test(url) && match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  return url;
}

export default function Home() {
  const { lang } = useContext(LangContext);
  const text = homeDescription[lang];
  const [singers, setSingers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [conceptsDb, setConceptsDb] = useState([]);
  const [optionsDb, setOptionsDb] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/singers")
      .then((res) => res.json())
      .then((data) => setSingers(data));
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
    fetch("/api/concepts")
      .then((res) => res.json())
      .then((data) => setConceptsDb(data));
    fetch("/api/options")
      .then((res) => res.json())
      .then((data) => setOptionsDb(data));
  }, []);

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConcept(null);
  };

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
          {singers.map((item, index) => (
            <SingerCard key={item._id || index} name={item.name} imageSrc={item.image} role={item.role} />
          ))}
        </div>
      </section>

      {/* Concepts Section */}
      <section className="w-full bg-background py-10 px-4">
        <h2 className="text-3xl font-bold text-gold mb-6 text-center">{lang === "en" ? "Our Concepts" : lang === "fr" ? "Nos Formules" : "הקונספטים שלנו"}</h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {conceptsDb.slice(0, 4).map((item, index) => (
            <Concept 
              key={item._id || index}
              isCard={true} 
              name={item.name} 
              imgSrc={item.image} 
              info={item.info} 
              onClick={() => handleConceptClick(item)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/concept" className="text-gold hover:text-primary font-bold text-lg underline">{lang === "en" ? "See All Concepts" : lang === "fr" ? "Voir toutes les formules" : "לכל הקונספטים"}</Link>
        </div>
      </section>

      {/* Videos Section */}
      <section className="w-full bg-primary py-10 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-6">{lang === "en" ? "Videos" : lang === "fr" ? "Vidéos" : "סרטונים"}</h2>
        {videos.length > 0 && (
          <div className="w-full max-w-3xl aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
            {(() => {
              const url = normalizeYouTubeUrl(videos[0].url);
              const match = url.match(/[?&]v=([\w-]{11})/);
              const videoId = match ? match[1] : null;
              if (videoId) {
                return (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={videos[0].title || "YouTube video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: '0.5rem', overflow: 'hidden', minHeight: 150 }}
                  />
                );
              } else {
                return <div style={{ color: 'red', padding: 8 }}>Invalid YouTube URL</div>;
              }
            })()}
          </div>
        )}
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
          {optionsDb.slice(0, 4).map((item, index) => (
            <Link href="/options" key={item._id || index}>
              <div className="h-[300px] w-[220px] md:w-[320px] rounded-2xl overflow-hidden shadow-lg relative group bg-white">
                <img src={item.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-white text-center py-3 text-lg font-bold">{item.name[lang]}</div>
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

      {/* Concept Description Modal */}
      {showModal && selectedConcept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-hover transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Image Section */}
                <div className="lg:w-[40%] flex-shrink-0">
                  <div className="w-full h-80 lg:h-96 rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src={selectedConcept.image}
                      alt={selectedConcept.name[lang]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-[60%] flex-1">
                  <h2 className="text-3xl md:text-4xl font-black text-primary mb-6 border-b-4 border-primary pb-2">
                    {selectedConcept.name[lang]}
                  </h2>
                  
                  <div className="space-y-6">
                    {selectedConcept.info && selectedConcept.info.length > 0 ? (
                      selectedConcept.info.map((item, index) => (
                        <div key={index} className="bg-background/5 rounded-xl p-4">
                          <h3 className="text-xl font-bold text-primary mb-3">
                            {item.title?.[lang]}
                          </h3>
                          {item.description?.[lang] && (
                            <div className="space-y-2">
                              {Array.isArray(item.description[lang]) ? 
                                item.description[lang].map((desc, descIndex) => (
                                  <p key={descIndex} className="text-background text-lg leading-relaxed">
                                    {desc}
                                  </p>
                                ))
                                : 
                                <p className="text-background text-lg leading-relaxed">
                                  {item.description[lang]}
                                </p>
                              }
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="bg-background/5 rounded-xl p-4">
                        <p className="text-background text-lg leading-relaxed">
                          {lang === "en" 
                            ? "No detailed information available for this concept. Please contact us for more details." 
                            : lang === "fr" 
                            ? "Aucune information détaillée disponible pour cette formule. Veuillez nous contacter pour plus de détails." 
                            : "אין מידע מפורט זמין עבור קונספט זה. אנא צרו קשר לפרטים נוספים."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-8 pt-6 border-t-2 border-gold">
                    <p className="text-background text-lg mb-4">
                      {lang === "en" 
                        ? "Interested in this concept? Contact us for more details and pricing!" 
                        : lang === "fr" 
                        ? "Intéressé par cette formule ? Contactez-nous pour plus de détails et tarifs !" 
                        : "מעוניינים בקונספט זה? צרו קשר לפרטים נוספים ומחירים!"}
                    </p>
                    <Link 
                      href="/contacts" 
                      className="inline-block bg-gold text-background font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      {lang === "en" ? "Contact Us" : lang === "fr" ? "Nous Contacter" : "צרו קשר"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
