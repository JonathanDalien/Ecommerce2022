import React from "react";
import Image from "next/image";
import img from "../assets/headphones.webp";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ text, price, category, brand, image, productId }) => {
  return (
    <Link href={`products/${productId}`}>
      <div className=" flex min-h-[350px] w-[300px] flex-col rounded-3xl bg-slate-300 px-6 py-5 transition-all hover:scale-[1.02]">
        <div className="picture h-[100%] w-[100%] flex-[1] items-center self-center">
          <div className="flex items-center justify-center">
            <img
              src={image ? urlFor(image[0]) : ""}
              className=" max-h-[150px] self-center rounded-lg object-cover mix-blend-multiply"
            />
          </div>
        </div>
        <div className="details">
          <div className="my-2 flex justify-between">
            <p className="mb-2 text-xs">{category}</p>
            <p className="mb-2 text-xs">{brand}</p>
          </div>
          <div className="my-2 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="w-36 ">
                <p className="overflow-hidden text-ellipsis text-xl font-bold">
                  {text}
                </p>
              </div>
            </div>
            <div className="cursor-pointer rounded-full bg-gradient-to-r from-cyan-600 to-purple-400 p-3 text-5xl transition-all hover:scale-105 hover:text-white ">
              <AiOutlineShoppingCart />
            </div>
          </div>
          <p className="text-xl">{price} €</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
