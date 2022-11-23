import React from "react";
import Product from "./Product";

const Trends = ({ products }) => {
  return (
    <div className="container m-auto py-16">
      <h1 className=" pb-12 text-center text-4xl font-bold ">
        Beliebte Produkte
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {products &&
          products.map((product) => {
            return (
              <Product
                key={product.productId.current}
                productId={product.productId.current}
                text={product.name}
                price={product.price}
                category={product.category}
                brand={product.brand}
                image={product.allImage}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Trends;
