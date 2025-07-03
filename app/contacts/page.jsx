"use client"

import { LangContext } from "../contexts/LangContext";
import React, { useContext, useState } from "react";

import emailjs from "@emailjs/browser";

import { form } from "../config";

const ContactsPage = () => {
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const { lang } = useContext(LangContext);

  const text = form[lang];

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    emailjs
      .send(
        "service_ms4l9sa", // Replace with your EmailJS Service ID
        "template_2ebk09g", // Replace with your EmailJS Template ID
        {
          name: inputs.name,
          phone: inputs.phone,
          email: inputs.email,
          note: inputs.note,
        },
        "eEuNjxjft9bZeDvRz" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Email sent successfully!");
        },
        (error) => {
          console.error("Error sending email:", error);
          alert("Failed to send email.");
        }
      );
  };

  return (
    <main className="min-h-[80vh] bg-background flex flex-col items-center w-full py-10 px-4">
      {/* Booking Coming Soon Banner */}
      <div className="w-full max-w-3xl mb-8">
        <div className="bg-gold text-background text-center font-bold text-xl md:text-2xl py-4 px-6 rounded-2xl shadow-lg border-2 border-gold animate-pulse">
          {lang === "en"
            ? "Booking feature coming soon!"
            : lang === "fr"
            ? "La réservation arrive bientôt !"
            : "אפשרות הזמנה תגיע בקרוב!"}
        </div>
      </div>
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* Info Panel */}
        <div className="bg-primary text-white p-8 rounded-3xl shadow-lg flex-1 mb-8 md:mb-0">
          <h2 className="text-3xl font-extrabold mb-4 text-center">{text.title}</h2>
          {text.description.split(",").map((item, index) => (
            <p className="font-bold my-2 text-center" key={index}>
              {item}
            </p>
          ))}
        </div>
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-8 rounded-3xl shadow-lg flex-1 min-w-[280px] max-w-xl mx-auto"
        >
          <label className="font-semibold text-lg text-primary" htmlFor="name">
            {text.name}
          </label>
          <input
            className="mb-2 p-3 rounded-lg border-2 border-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
            name="name"
            id="name"
            required
            onChange={handleChange}
          />
          <label className="font-semibold text-lg text-primary" htmlFor="phone">
            {text.phone}
          </label>
          <input
            className="mb-2 p-3 rounded-lg border-2 border-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
            name="phone"
            id="phone"
            type="tel"
            required
            onChange={handleChange}
          />
          <label className="font-semibold text-lg text-primary" htmlFor="email">
            {text.email}
          </label>
          <input
            className="mb-2 p-3 rounded-lg border-2 border-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
            name="email"
            id="email"
            type="email"
            required
            onChange={handleChange}
          />
          <label className="font-semibold text-lg text-primary" htmlFor="note">
            {text.note}
          </label>
          <textarea
            className="mb-2 p-3 rounded-lg border-2 border-gold h-36 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
            name="note"
            id="note"
            type="text"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-gold text-background font-bold text-2xl p-3 rounded-full shadow hover:bg-primary hover:text-white transition self-center mt-4"
          >
            {text.submit}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactsPage;
