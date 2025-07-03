"use client"

import Concept from "../../components/Concept";
import { concepts } from "../../config";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ConceptPage = () => {
  const params = useParams();
  const id = parseInt(params.id);
  const concept = concepts[id];
  const prevId = id - 1 >= 0 ? id - 1 : concepts.length - 1;
  const nextId = id + 1 < concepts.length ? id + 1 : 0;

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-background py-10 px-4 relative">
      <div className="w-full max-w-5xl flex flex-col items-center relative">
        {/* Concept Card (detailed view) */}
        <Concept
          isCard={false}
          name={concept.name}
          imgSrc={concept.imgSrc}
          info={concept.info}
        />
        {/* Overlay navigation arrows on the image */}
        <div className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-20">
          <Link
            href={`/concept/${prevId}`}
            className="flex items-center justify-center w-14 h-14 bg-black/40 hover:bg-gold/80 text-white hover:text-background rounded-full shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-gold"
            aria-label="Previous event"
          >
            &#8592;
          </Link>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20">
          <Link
            href={`/concept/${nextId}`}
            className="flex items-center justify-center w-14 h-14 bg-black/40 hover:bg-gold/80 text-white hover:text-background rounded-full shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-gold"
            aria-label="Next event"
          >
            &#8594;
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ConceptPage;
