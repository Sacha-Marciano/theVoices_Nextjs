import React from "react";
import { Link } from "react-router-dom";

const SingerCard = ({ name, imageSrc, role }) => {
  return (
    <Link
      to={"/voices"}
      className="relative md:flex justify-center cursor-pointer  transition-transform duration-300 ease-in-out hover:scale-110"
    >
      <img
        src={imageSrc}
        alt={name}
        className=" h-full min-w-[200px] object-cover rounded-2xl"
      />
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-end text-white bg-primary bg-opacity-50 font-bold text-center rounded-b-md p-2 space-y-2">
        <h2 className="md:text-2xl">{name}</h2>
        <p>{role}</p>
      </div>
    </Link>
  );
};

export default SingerCard;
