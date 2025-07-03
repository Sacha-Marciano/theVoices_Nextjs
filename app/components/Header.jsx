"use client";
import React, { useContext } from "react";
import Navigation from "./Navigation";
import { LangContext } from "../contexts/LangContext";
import Link from "next/link";

const Header = () => {
  const { toggleLang, lang } = useContext(LangContext);

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 bg-background border-b-2 border-gold shadow-md sticky top-0 z-30">
      <Link href="/" className="flex items-center" aria-label="Home">
        <img src={"../assets/logo.png"} alt="The Voices Logo" className="max-w-[140px] md:max-w-[180px] mt-2 md:mt-4" />
      </Link>
      <nav className="hidden lg:flex flex-1 justify-center">
        <Navigation />
      </nav>
      <div className="flex items-center gap-4">
        <select
          className="bg-background text-gold border-2 border-gold rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Select language"
          value={lang}
          onChange={(evt) => {
            toggleLang(evt.target.value);
          }}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="he">עברית</option>
        </select>
        <div className="lg:hidden">
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header; 