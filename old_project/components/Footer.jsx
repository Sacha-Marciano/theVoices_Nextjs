import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LangContext } from "@/contexts/LangContext";

const Footer = () => {
  const location = useLocation(); // Get current location

  const { lang } = useContext(LangContext);

  return (
    <div>
      <div
        className={`bg-primary flex items-center justify-center h-[25vh] my-4 ${
          location.pathname === "/contacts" ? "hidden" : "visible"
        }`}
      >
        <Link
          className="text-white text-3xl lg:text-6xl border-2 border-white p-4"
          to={"/contacts"}
        >
          {lang === "en"
            ? "Contact Us"
            : lang === "fr"
            ? "Contactez Nous"
            : "צרו קשר"}
        </Link>
      </div>
      <div className="flex justify-between p-4 items-end">
        <div className="text-white">
          <p>© Copyright 2019 </p> <p> All rights reserved The Voices</p>
        </div>
        <div>
          <div className="flex gap-4 mr-4 justify-end">
            <Link
              to={
                "https://www.instagram.com/stephthevoices?igsh=Z3l1Y21tcnN1eDY1&utm_source=qr "
              }
              target="_blank"
            >
              <InstagramIcon sx={{ color: "white" }} />
            </Link>
            <Link to={"https://www.facebook.com/dj.thevoices"} target="_blank">
              <FacebookIcon sx={{ color: "white" }} />
            </Link>
            <Link
              to={"https://www.youtube.com/channel/UCTmOB79D5sJnCpEc8FIwhXw"}
              target="_blank"
            >
              <YouTubeIcon sx={{ color: "white" }} />
            </Link>
          </div>
          <p className="text-white">Dev by S.M.M</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
