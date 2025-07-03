"use client";
import React, { useContext } from "react";
import Navigation from "./Navigation";
import { LangContext } from "../contexts/LangContext";
import Link from "next/link";

const Header = () => {
  const { toggleLang } = useContext(LangContext);

  return (
    <div className="w-full flex justify-around  bg-background items-center">
      <Link href="/">
        <img src={"../assets/logo.png"} className="max-w-[200px] mt-4" />
      </Link>
      <div className="flex flex-col gap-4 lg:gap-0 ">
        <div className="flex gap-5 items-center justify-center">
          <Navigation />
          <select
            className={"bg-background text-primary"}
            onChange={(evt) => {
              toggleLang(evt.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="fr">Francais</option>
            <option value="he">e2d1e8d9ea</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header; 