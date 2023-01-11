import React, { useState } from "react";
import Product from "../components/Product";
import { client } from "../lib/client";
import Head from "next/head";

const Offers = ({ productsAllProducts }) => {
  const [sort, setSort] = useState("alphAsc");
  const [product, setProduct] = useState(productsAllProducts);

  const handleSort = (sort) => {
    setSort(sort);
    switch (sort) {
      case "alphAsc":
        setProduct((product) => {
          return [...product].sort((a, b) => a.name.localeCompare(b.name));
        });
        break;
      case "alphDesc":
        setProduct((product) => {
          return [...product].sort((a, b) => b.name.localeCompare(a.name));
        });
        break;
      case "priceAsc":
        setProduct((product) => {
          return [...product].sort((a, b) => a.price - b.price);
        });
        break;
      case "priceDesc":
        setProduct((product) => {
          return [...product].sort((a, b) => b.price - a.price);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Angebote</title>
      </Head>
      <div className="min-h-[calc(100vh-84px)] bg-slate-100 p-8">
        <div className="container m-auto md:py-16">
          <h1 className="py-4 text-4xl font-bold ">Angebote</h1>
          <hr className="py-1" />
          <div className="flex flex-col items-center justify-between pb-4 lg:flex-row">
            <p className="font-bold">Sortieren nach</p>
            <div className="flex gap-10 py-2">
              <button
                className={
                  sort == "alphAsc"
                    ? "rounded-lg bg-slate-200 p-2 text-sm"
                    : "p-2 text-sm "
                }
                onClick={() => handleSort("alphAsc")}
              >
                Alph. aufst.
              </button>
              <button
                className={
                  sort == "alphDesc"
                    ? "rounded-lg bg-slate-200 p-2 text-sm"
                    : " p-2  text-sm"
                }
                onClick={() => handleSort("alphDesc")}
              >
                Alph. abst.
              </button>
              <button
                className={
                  sort == "priceAsc"
                    ? "rounded-lg bg-slate-200 p-2 text-sm"
                    : "p-2 text-sm"
                }
                onClick={() => handleSort("priceAsc")}
              >
                Preis aufst.
              </button>
              <button
                className={
                  sort == "priceDesc"
                    ? "rounded-lg bg-slate-200 p-2 text-sm"
                    : "p-2 text-sm"
                }
                onClick={() => handleSort("priceDesc")}
              >
                Preis abst.
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-14">
            {product?.map((product) => {
              return (
                <Product key={product.productId.current} product={product} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;

export const getServerSideProps = async () => {
  const queryAllProducts =
    '*[_type=="product" && isSale == true] | order(name asc)';

  const productsAllProducts = await client.fetch(queryAllProducts);

  return {
    props: {
      productsAllProducts,
    },
  };
};
