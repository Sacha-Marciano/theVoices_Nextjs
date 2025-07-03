"use client";
import LangProvider from "../contexts/LangContext";

export default function ClientLayout({ children }) {
  return <LangProvider>{children}</LangProvider>;
} 