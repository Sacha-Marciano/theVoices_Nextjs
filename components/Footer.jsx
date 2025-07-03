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
            : "e6e8d5 e7e9e8"}
        </Link>
      </div>
      <div className="flex justify-between p-4 items-end">
        <div className="text-white">
          <p>© Copyright 2019 </p> <p> All rights reserved The Voices</p>
        </div>
        <div>
          <div className="flex gap-4 mr-4 justify-end">
            <a
              href="https://www.instagram.com/stephthevoices?igsh=Z3l1Y21tcnN1eDY1&utm_source=qr "
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon sx={{ color: "white" }} />
            </a>
            <a href="https://www.facebook.com/dj.thevoices" target="_blank" rel="noopener noreferrer">
              <FacebookIcon sx={{ color: "white" }} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCTmOB79D5sJnCpEc8FIwhXw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon sx={{ color: "white" }} />
            </a>
          </div>
          <p className="text-white">Dev by S.M.M</p>
        </div>
      </div>
    </div>
  );
};

export default Footer; 