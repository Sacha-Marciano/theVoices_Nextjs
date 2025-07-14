"use client"

import React, { useEffect, useState } from "react";
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
      <div className="grid grid-cols-1 gap-8 w-full max-w-6xl">
        {videos.map((video, idx) => (
          <div
            key={video._id || idx}
            className="flex flex-col items-center justify-center rounded-3xl shadow-lg bg-white p-6 w-full"
          >
            <h2 className={`text-primary text-2xl md:text-3xl font-bold mb-4 text-center`}>{video.title}</h2>
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border-4 border-gold bg-background" style={{ maxWidth: '100%' }}>
              {(() => {
                const url = normalizeYouTubeUrl(video.url);
                const match = url.match(/[?&]v=([\w-]{11})/);
                const videoId = match ? match[1] : null;
                if (videoId) {
                  return (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title || "YouTube video"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: '1rem', overflow: 'hidden', minHeight: 300, maxWidth: '100%' }}
                    />
                  );
                } else {
                  return <div style={{ color: 'red', padding: 8 }}>Invalid YouTube URL</div>;
                }
              })()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default VideosPage;
