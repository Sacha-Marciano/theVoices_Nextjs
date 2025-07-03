import { singersDescriptions, theVoicesDescription } from "@/config";
import { LangContext } from "@/contexts/LangContext";
import React, { useContext } from "react";

const VoicesPage = () => {
  const { lang } = useContext(LangContext);
  const text = theVoicesDescription[lang];
  return (
    <div className="bg-white">
      <div className="relative max-h-[70vh] ">
        <img
          src="assets/pics/2.jpg"
          className="w-full object-cover max-h-[70vh] "
        />
      </div>
      <div className="text-center space-y-4 mb-6 font-semibold">
        <h2 className="font-bold text-3xl text-primary mt-6">{text.title}</h2>
        <p>{text.p1}</p>
        <p>{text.p2}</p>
        <p>{text.p3}</p>
        <p>{text.p4}</p>
        <p>{text.p5}</p>
        <p>{text.p6}</p>
      </div>
      <div className="grid lg:grid-cols-2 lg:gap-4">
        {singersDescriptions.map((item, index) => {
          if (index % 2 === 0) {
            return (
              <div key={index} className="flex gap-3 bg-primary text-white">
                <img
                  src={item.imageSrc}
                  className="lg:order-1 w-[50%] object-cover"
                />
                <div className="p-4 w-full lg:order-2">
                  <h3 className="text-2xl font-semibold"> {item.name} </h3>
                  <p>{item.role[lang]} </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="flex gap-3 lg:bg-primary lg:text-white"
              >
                <img
                  src={item.imageSrc}
                  className="lg:order-1 order-2 w-[50%] object-cover"
                />
                <div className="p-4 w-full order-1 lg:order-2">
                  <h3 className="text-2xl font-semibold"> {item.name} </h3>
                  <p>{item.role[lang]} </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default VoicesPage;
