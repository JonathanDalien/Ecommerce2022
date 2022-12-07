import React from "react";
import Product from "./Product";

const Trends = ({ products }) => {
  return (
    <div className="container m-auto py-16">
      <h1 className=" pb-12 text-center text-3xl font-bold lg:text-4xl ">
        Beliebte Produkte
      </h1>
      <div className="flex flex-wrap justify-center gap-3 md:gap-10">
        {products &&
          products.map((product) => {
            return (
              <Product key={product.productId.current} product={product} />
            );
          })}
      </div>
    </div>
  );
};

export default Trends;
