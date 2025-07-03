"use client"

import React from "react";

const videos = [
  {
    title: "Teaser",
    url: "https://www.youtube.com/embed/aXtZP_-frJ4",
    bg: "bg-white",
    text: "text-primary",
  },
  {
    title: "Locked out of heaven",
    url: "https://www.youtube.com/embed/BOlD9ZM1NwQ",
    bg: "bg-primary",
    text: "text-white",
  },
  {
    title: "Ain't no mountain high enough",
    url: "https://www.youtube.com/embed/POV6Ppf1Pr8",
    bg: "bg-gold",
    text: "text-background",
  },
  {
    title: "Teaser 2017",
    url: "https://www.youtube.com/embed/dtLMBo6E-b4",
    bg: "bg-white",
    text: "text-primary",
  },
  {
    title: "The Show",
    url: "https://www.youtube.com/embed/R1ZXJtWZkOE?si=t9JDWfItjGP4cVjp",
    bg: "bg-primary",
    text: "text-white",
  },
];

const VideosPage = () => {
  return (
    <main className="min-h-[80vh] bg-background flex flex-col items-center w-full py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-black text-gold text-center mb-8 drop-shadow-lg">VIDEOS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {videos.map((video, idx) => (
          <div
            key={video.title}
            className={`flex flex-col items-center justify-center rounded-3xl shadow-lg ${video.bg} p-6 transition-transform hover:scale-105`}
          >
            <h2 className={`${video.text} text-2xl md:text-3xl font-bold mb-4 text-center`}>{video.title}</h2>
            <div className="w-full aspect-video max-w-xl rounded-2xl overflow-hidden shadow-md border-4 border-gold bg-background">
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-2xl"
                tabIndex={0}
                aria-label={video.title}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default VideosPage;
