import React, { useContext, useState } from "react";

import { LangContext } from "@/contexts/LangContext";

const PicturesPage = () => {
  const { lang } = useContext(LangContext);

  const [openImg, setOpenImg] = useState(false);
  const [imgToShow, setImgToShow] = useState(1);

  const pics = new Array(40).fill(null).map((_, index) => {
    return `assets/pics/${index + 1}.jpg`;
  });

  return (
    <div className="relative">
      <h1 className="text-3xl text-primary text-center font-bold mb-4">
        {lang === "en"
          ? "Our Pictures"
          : lang === "fr"
          ? "Nos Photos"
          : "התמונות שלנו"}
      </h1>
      <div className="flex flex-wrap justify-center gap-3">
        {pics.map((img, index) => {
          return (
            <img
              key={index}
              src={img}
              alt="Image from picture gallery"
              className="max-w-[300px] cursor-pointer"
              onClick={async () => {
                setImgToShow(index);
                setOpenImg(true);
              }}
            />
          );
        })}
      </div>
      <div
        className={`h-full w-full fixed inset-0 bg-black ${
          openImg ? "flex justify-center items-center" : "hidden"
        }`}
        onClick={() => setOpenImg(false)}
      >
        <button
          className="text-white font-bold text-4xl absolute top-5 right-12"
          onClick={() => setOpenImg(false)}
        >
          X
        </button>
        <button
          className="text-white font-bold text-4xl mr-2 lg:mr-5"
          onClick={(evt) => {
            evt.stopPropagation();
            pics[imgToShow - 1]
              ? setImgToShow(imgToShow - 1)
              : setImgToShow(pics.length - 1);
          }}
        >
          {`<`}
        </button>
        <img
          src={pics[imgToShow]}
          alt="Selected picture"
          className="w-[80%] h-[90%] object-contain "
        />
        <button
          className="text-white font-bold text-4xl ml-2 lg:ml-5"
          onClick={(evt) => {
            evt.stopPropagation();
            pics[imgToShow + 1] ? setImgToShow(imgToShow + 1) : setImgToShow(0);
          }}
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default PicturesPage;
