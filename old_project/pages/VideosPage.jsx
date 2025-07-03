import React from "react";
import ReactPlayer from "react-player";

const VideosPage = () => {
  return (
    <div className="p-4 text-center space-y-4">
      <h1 className="text-6xl text-primary font-bold my-4">VIDEOS</h1>
      {/* Video 1 */}
      <div className="lg:flex justify-center items-center rounded-md bg-white p-4">
        <h2 className="text-primary text-3xl p-4 font-bold">Teaser</h2>
        <ReactPlayer
          url={"https://youtu.be/aXtZP_-frJ4"}
          height={500}
          width={"100%"}
        />
      </div>
      {/* Video 2 */}
      <div className="lg:flex justify-center items-center  rounded-md bg-primary p-4">
        <ReactPlayer
          url={"https://youtu.be/BOlD9ZM1NwQ"}
          height={500}
          width={"100%"}
        />
        <h2 className="text-white font-bold text-3xl p-4">
          Locked out of heaven
        </h2>
      </div>
      {/* Video 3 */}
      <div className="lg:flex justify-center items-center rounded-md p-4">
        <h2 className="text-white font-bold text-3xl p-4">
          Ain't no mountain high enough
        </h2>
        <ReactPlayer
          url={"https://youtu.be/POV6Ppf1Pr8"}
          height={500}
          width={"100%"}
        />
      </div>
      {/* Video 4 */}
      <div className="lg:flex justify-center items-center rounded-md bg-white p-4">
        <h2 className="text-primary font-bold text-3xl p-4">Teaser 2017</h2>
        <ReactPlayer
          url={"https://youtu.be/dtLMBo6E-b4"}
          height={500}
          width={"100%"}
        />
      </div>
      {/* Video 5 - not existant */}
      <div className="lg:flex justify-center items-center rounded-md bg-primary p-4">
        <ReactPlayer url={""} height={500} width={"100%"} />
        <h2 className="text-white font-bold text-3xl p-4">Clip The Voices</h2>
      </div>
      {/* Video 6 */}
      <div className="lg:flex justify-center items-center rounded-md p-4">
        <h2 className="text-white font-bold text-3xl p-4">The Show</h2>
        <ReactPlayer
          url={"https://youtu.be/R1ZXJtWZkOE?si=t9JDWfItjGP4cVjp"}
          height={500}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default VideosPage;
