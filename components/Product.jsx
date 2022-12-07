import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product }) => {
  return (
    <Link href={`products/${product.productId.current}`}>
      <div className=" flex h-[250px] w-[200px] flex-col rounded-3xl bg-slate-300 px-3 py-5 transition-all hover:scale-[1.02] md:h-[350px] md:w-[300px] md:px-6">
        <div className="picture relative h-[100%] w-[100%] flex-[1] items-center self-center">
          <img
            src={product.allImage ? urlFor(product.allImage[0]) : ""}
            className=" absolute top-0 right-0 left-0 bottom-0 m-auto max-h-[100px] self-center rounded-lg object-cover mix-blend-multiply md:max-h-[150px]"
          />
        </div>
        <div className="details">
          <div className="my-2 flex justify-center md:justify-between">
            <p className="mb-2 hidden text-xs md:block">{product.category}</p>
            <p className="mb-2 text-xs">{product.brand}</p>
          </div>
          <div className="my-2 flex items-center justify-center md:justify-between">
            <div className="flex flex-col gap-2">
              <div className="md:w-36 ">
                <p className="overflow-hidden text-ellipsis text-center text-lg font-bold md:text-start">
                  {product.name}
                </p>
              </div>
            </div>
            <div className=" hidden cursor-pointer rounded-full bg-gradient-to-r from-cyan-600 to-purple-400 p-3 text-5xl transition-all hover:scale-105 hover:text-white md:flex ">
              <AiOutlineShoppingCart />
            </div>
          </div>
          <div className="flex items-end justify-center md:justify-start">
            {product.isSale ? (
              <>
                <p className="font-semibold text-red-600 md:text-xl">
                  {product.price} €
                </p>
                <p className="text-sm line-through">{product.oldPrice} €</p>
              </>
            ) : (
              <p className="md:text-xl">{product.price} €</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
