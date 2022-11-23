import Link from "next/link";
import React from "react";
import Category from "./Category";
import imgHeadphone from "../assets/headphones.webp";

const Categories = ({ categories }) => {
  return (
    <div className="container m-auto py-16">
      <h1 className=" pb-12 text-center text-4xl font-bold">
        Kategorien durchstöbern
      </h1>
      <div className="flex justify-center space-x-24">
        <div className="w-[200px]">
          <Link href="">
            <div className="category-card flex h-[200px] w-[200px] items-center justify-center rounded-full bg-blue-800 transition-all hover:scale-105 hover:bg-red-500">
              <h1 className="text-3xl font-bold text-white">Angebote</h1>
            </div>
          </Link>
        </div>
        {categories.map((category, i) => {
          return <Category key={i} category={category} />;
        })}
      </div>
    </div>
  );
};

export default Categories;
