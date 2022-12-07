import React from "react";
import img from "../assets/headphones_c_2.webp";
import Image from "next/image";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";
import Link from "next/link";

const UpperBanner = ({ bannerData }) => {
  const { onAdd } = useStateContext();
  return (
    <div className=" container relative m-auto min-h-[60vh] py-10">
      <div className="">
        <p className=" break-words bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text  text-center text-4xl font-bold text-transparent md:hidden md:text-5xl lg:text-6xl ">
          Im Angebot
        </p>
        <p className=" text-center text-2xl font-bold text-black  sm:text-3xl md:hidden md:text-5xl lg:text-6xl">
          {bannerData.name}
        </p>
      </div>
      <div className="flex items-center justify-around">
        <div className=" hidden w-[30vw] md:block">
          <p className=" 3xl:text-8xl hidden break-words bg-gradient-to-r from-cyan-600 to-purple-400 bg-clip-text pb-4 text-2xl font-bold text-transparent md:block md:text-5xl lg:text-6xl xl:text-7xl ">
            Im Angebott
          </p>
          <p className=" hidden text-xl font-bold sm:text-3xl md:block md:text-5xl lg:text-6xl">
            {bannerData.name}
          </p>
          <div className="buttons mt-10 hidden md:block">
            <Link
              href={`/products/${bannerData.productId.current}`}
              className="rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-2 font-semibold text-white transition-all hover:scale-105 hover:from-cyan-500 hover:to-purple-300 md:px-6 xl:text-2xl"
            >
              Jetzt Kaufen
            </Link>
          </div>
        </div>
        <div className="my-4 flex items-center">
          <div className="relative flex flex-col items-center justify-center ">
            <img
              src={urlFor(bannerData.allImage[0])}
              className=" h-[200px] w-[200px]  object-contain mix-blend-multiply  sm:h-[200px] sm:w-[200px] md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px]"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-around gap-3  ">
        <p className="bottom-0 text-3xl text-gray-500 ">Nur für kurze Zeit</p>
        <div className="flex">
          <p className="right-0 bottom-0 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent sm:text-5xl  md:text-7xl lg:text-8xl">
            {bannerData.price}€
          </p>
          <p className="  right-0 bottom-0 text-xl font-bold text-gray-500 line-through  sm:text-3xl  md:text-5xl lg:text-6xl">
            {bannerData.oldPrice}€
          </p>
        </div>
        <div className="buttons m-4 md:hidden">
          <Link
            href={`/products/${bannerData.productId.current}`}
            className=" rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-2 font-semibold text-white transition-all hover:scale-105 hover:from-cyan-500 hover:to-purple-300  md:px-6 xl:text-2xl"
          >
            Jetzt Kaufen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpperBanner;
