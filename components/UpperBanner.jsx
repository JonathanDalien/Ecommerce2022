import React from "react";
import img from "../assets/headphones_c_2.webp";
import Image from "next/image";

const UpperBanner = () => {
  return (
    <div className="container relative m-auto p-36">
      <div className=" w-[500px]">
        <p className=" bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text pb-10 text-7xl font-bold text-transparent">
          IM ANGEBOT
        </p>
        <p className="text-6xl font-bold">
          by Intellect <br /> Driven By Values
        </p>
        <div className="buttons mt-10 space-x-7 ">
          <button
            type="button"
            className="rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-6 font-semibold text-white transition-all hover:scale-105 hover:from-cyan-500 hover:to-purple-300"
          >
            Jetzt Kaufen
          </button>
          <button
            type="button"
            className="border-b-2 border-black p-1 font-semibold transition-all hover:scale-105 "
          >
            Mehr erfahren
          </button>
        </div>
      </div>
      <div>
        <Image className="absolute top-0 right-2" src={img} alt="product" />
        <p className="absolute bottom-60 right-[580px] text-gray-500">
          Nur für kurze Zeit
        </p>
        <p className=" absolute bottom-36 right-[550px] bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-8xl font-bold text-transparent ">
          99€
        </p>
        <p className=" absolute bottom-36 right-[460px] text-3xl font-bold text-gray-500 line-through">
          149€
        </p>
      </div>
    </div>
  );
};

export default UpperBanner;
