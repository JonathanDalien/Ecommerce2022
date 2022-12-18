import Link from "next/link";
import React from "react";
import Category from "./Category";
import imgHeadphone from "../assets/headphones.webp";

const Categories = ({ categories }) => {
  return (
    <div className="container m-auto py-8 md:py-10 lg:py-16">
      <h1 className=" pb-12 text-center text-3xl font-bold lg:text-4xl">
        Kategorien durchstöbern
      </h1>
      <div className="flex justify-start gap-8 overflow-auto py-4 lg:gap-24 xl:justify-center">
        <div className="w-[200px]">
          <Link href="/offers">
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
