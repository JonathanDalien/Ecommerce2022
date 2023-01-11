import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const Category = ({ category }) => {
  return (
    <>
      <div className="w-[200px]">
        <Link href={`products?category=${category.category}`}>
          <div className="category-card flex h-[200px] w-[200px] items-center justify-center rounded-full bg-slate-300 transition-all hover:scale-105 hover:bg-red-500 ">
            <img
              className=" w-[70%] object-cover mix-blend-multiply "
              src={urlFor(category.previewImg)}
              alt={category?.name}
            />
          </div>
          <p className="pt-2 text-center text-lg font-bold">
            {category.category}
          </p>
        </Link>
      </div>
    </>
  );
};

export default Category;
