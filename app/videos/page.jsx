"use client"

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <main className="min-h-[80vh] bg-background flex flex-col items-center w-full py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-black text-gold text-center mb-8 drop-shadow-lg">VIDEOS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {videos.map((video, idx) => (
          <div
            key={video._id || idx}
            className={`flex flex-col items-center justify-center rounded-3xl shadow-lg bg-white p-6 transition-transform hover:scale-105`}
          >
            <h2 className={`text-primary text-2xl md:text-3xl font-bold mb-4 text-center`}>{video.title}</h2>
            <div className="w-full aspect-video max-w-xl rounded-2xl overflow-hidden shadow-md border-4 border-gold bg-background">
              <ReactPlayer
                url={video.url}
                width="100%"
                height="100%"
                controls
                style={{ borderRadius: '1rem', overflow: 'hidden' }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default VideosPage;
