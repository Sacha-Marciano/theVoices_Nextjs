"use client"

import React, { useEffect, useState, useContext } from "react";
import { LangContext } from "../contexts/LangContext";
import Concept from "../components/Concept";
import Link from "next/link";

const ConceptPage = () => {
  const { lang } = useContext(LangContext);
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/concepts")
      .then((res) => res.json())
      .then((data) => {
        setConcepts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load concepts:", err);
        setLoading(false);
      });
  }, []);

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConcept(null);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-[80vh] bg-background flex flex-col items-center w-full py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-black text-gold text-center mb-8 drop-shadow-lg">
        {lang === "en" ? "Our Concepts" : lang === "fr" ? "Nos Formules" : "הקונספטים שלנו"}
      </h1>
      <div className="flex gap-6 flex-wrap justify-center w-full max-w-6xl">
        {concepts.map((concept, index) => (
          <div key={concept._id || index} className="flex flex-col items-center">
            <Concept 
              isCard={true} 
              name={concept.name} 
              imgSrc={concept.image} 
              info={concept.info} 
              onClick={() => handleConceptClick(concept)}
            />
          </div>
        ))}
      </div>
      {concepts.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-xl">No concepts available</p>
        </div>
      )}

      {/* Concept Description Modal */}
      {showModal && selectedConcept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-hover transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Image Section */}
                <div className="lg:w-[40%] flex-shrink-0">
                  <div className="w-full h-80 lg:h-96 rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src={selectedConcept.image}
                      alt={selectedConcept.name[lang]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-[60%] flex-1">
                  <h2 className="text-3xl md:text-4xl font-black text-primary mb-6 border-b-4 border-primary pb-2">
                    {selectedConcept.name[lang]}
                  </h2>
                  
                  <div className="space-y-6">
                    {selectedConcept.info && selectedConcept.info.length > 0 ? (
                      selectedConcept.info.map((item, index) => (
                        <div key={index} className="bg-background/5 rounded-xl p-4">
                          <h3 className="text-xl font-bold text-primary mb-3">
                            {item.title?.[lang]}
                          </h3>
                          {item.description?.[lang] && (
                            <div className="space-y-2">
                              {Array.isArray(item.description[lang]) ? 
                                item.description[lang].map((desc, descIndex) => (
                                  <p key={descIndex} className="text-background text-lg leading-relaxed">
                                    {desc}
                                  </p>
                                ))
                                : 
                                <p className="text-background text-lg leading-relaxed">
                                  {item.description[lang]}
                                </p>
                              }
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="bg-background/5 rounded-xl p-4">
                        <p className="text-background text-lg leading-relaxed">
                          {lang === "en" 
                            ? "No detailed information available for this concept. Please contact us for more details." 
                            : lang === "fr" 
                            ? "Aucune information détaillée disponible pour cette formule. Veuillez nous contacter pour plus de détails." 
                            : "אין מידע מפורט זמין עבור קונספט זה. אנא צרו קשר לפרטים נוספים."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-8 pt-6 border-t-2 border-gold">
                    <p className="text-background text-lg mb-4">
                      {lang === "en" 
                        ? "Interested in this concept? Contact us for more details and pricing!" 
                        : lang === "fr" 
                        ? "Intéressé par cette formule ? Contactez-nous pour plus de détails et tarifs !" 
                        : "מעוניינים בקונספט זה? צרו קשר לפרטים נוספים ומחירים!"}
                    </p>
                    <Link 
                      href="/contacts" 
                      className="inline-block bg-gold text-background font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      {lang === "en" ? "Contact Us" : lang === "fr" ? "Nous Contacter" : "צרו קשר"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ConceptPage; 