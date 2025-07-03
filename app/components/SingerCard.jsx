"use client";
import React from "react";
import Link from "next/link";

const SingerCard = ({ name, imageSrc, role }) => {
  return (
    <Link
      href="/voices"
      className="group relative flex flex-col items-center justify-center w-48 h-64 bg-white rounded-3xl shadow-lg border-2 border-gold hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-gold"
      tabIndex={0}
      aria-label={`See more about ${name}`}
    >
      <div className="relative mt-6 mb-3">
        <img
          src={imageSrc}
          alt={name}
          className="w-32 h-32 object-cover rounded-full border-4 border-gold shadow-md group-hover:shadow-xl transition-shadow duration-300"
        />
      </div>
      <div className="flex flex-col items-center px-2">
        <h2 className="text-xl font-extrabold text-primary mb-1 text-center">{name}</h2>
        <p className="text-gold font-semibold text-center">{role}</p>
      </div>
      <span className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-primary transition-all pointer-events-none" />
    </Link>
  );
};

export default SingerCard; 