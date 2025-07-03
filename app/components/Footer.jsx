"use client";
import React, { useContext } from "react";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LangContext } from "../contexts/LangContext";

const Footer = () => {
  const { lang } = useContext(LangContext);
  // In Next.js, useRouter can be used if needed, but for now, always show the contact link
  return (
    <div>
      <div className="bg-primary flex items-center justify-center h-[25vh] my-4">
        <Link
          className="text-white text-3xl lg:text-6xl border-2 border-white p-4"
          href="/contacts"
        >
          {lang === "en"
            ? "Contact Us"
            : lang === "fr"
            ? "Contactez Nous"
            : "צור קשר"}
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-between p-4 items-end bg-background border-t-2 border-gold">
        <div className="text-white mb-4 md:mb-0">
          <p>© 2024 The Voices</p>
          <p>All rights reserved</p>
        </div>
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-0">
          <div className="flex gap-4">
            <Link href="/" className="text-white hover:text-gold transition">Home</Link>
            <Link href="/concept" className="text-white hover:text-gold transition">Events</Link>
            <Link href="/voices" className="text-white hover:text-gold transition">Voices</Link>
            <Link href="/pictures" className="text-white hover:text-gold transition">Pictures</Link>
            <Link href="/videos" className="text-white hover:text-gold transition">Videos</Link>
            <Link href="/contacts" className="text-white hover:text-gold transition">Contact</Link>
          </div>
          <div className="flex gap-4 mt-2 justify-center">
            <a href="https://www.instagram.com/stephthevoices?igsh=Z3l1Y21tcnN1eDY1&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon sx={{ color: "var(--color-gold)", fontSize: 32 }} />
            </a>
            <a href="https://www.facebook.com/dj.thevoices" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon sx={{ color: "var(--color-gold)", fontSize: 32 }} />
            </a>
            <a href="https://www.youtube.com/channel/UCTmOB79D5sJnCpEc8FIwhXw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <YouTubeIcon sx={{ color: "var(--color-gold)", fontSize: 32 }} />
            </a>
          </div>
        </div>
        <div className="text-white text-sm text-right">
          <p>Dev by S.M.M</p>
        </div>
      </div>
    </div>
  );
};

export default Footer; 