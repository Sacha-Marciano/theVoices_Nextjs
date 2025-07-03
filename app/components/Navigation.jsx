"use client";
import React, { useContext, useState } from "react";
import { navLinks } from "../config";
import Link from "next/link";
import { LangContext } from "../contexts/LangContext";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const { lang } = useContext(LangContext);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className=" lg:hidden">
        <Menu className="text-primary" onClick={() => setMenuOpen(true)} />
      </div>
      <div
        className={`${
          menuOpen ? "flex flex-col" : "hidden"
        } fixed top-0 bottom-0 right-0 w-[50%] z-20 bg-black text-white`}
      >
        <button
          className="text-4xl font-extrabold absolute top-1 right-2"
          onClick={() => setMenuOpen(false)}
        >
          X
        </button>
        <div className="flex flex-col mt-10 p-4 gap-4">
          <Link href="/">
            <img src={"../assets/logo.png"} className="w-full" />
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-bold  hover:text-hover ${
                pathname === item.path
                  ? " text-primary border-b-2 border-primary"
                  : "text-white border-0"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name[lang]}
            </Link>
          ))}
        </div>
      </div>
      <div className=" gap-4 p-4 hidden lg:flex">
        {navLinks.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`font-bold  hover:text-hover ${
              pathname === item.path
                ? " text-primary border-b-2 border-primary"
                : "text-white border-0"
            }`}
          >
            {item.name[lang]}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation; 