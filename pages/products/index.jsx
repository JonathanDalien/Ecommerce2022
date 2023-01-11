import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { client } from "../../lib/client";
import { useRouter } from "next/router";
import Head from "next/head";

const Products = ({ productsAllProducts }) => {
  const router = useRouter();
  const [currentCat, setCurrentCat] = useState(
    router.query.category || "Alle Produkte"
  );
  const [CatText, setCatText] = useState("Alle Produkte");
  const [sort, setSort] = useState("alphAsc");
  const [product, setProduct] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (router.query.category == null) {
      setCurrentCat("Alle Produkte");
      setCatText("Alle Produkte");
      setProduct(productsAllProducts);
    } else if (router.query.category == "Kopfhörer") {
      setCurrentCat("Kopfhörer");
      setCatText("Kopfhörer");
      setProduct(() =>
        [...productsAllProducts].filter(
          (product) => product.category == "Kopfhörer"
        )
      );
    } else if (router.query.category == "Lautsprecher") {
      setCurrentCat("Lautsprecher");
      setCatText("Lautsprecher");
      setProduct(() =>
        [...productsAllProducts].filter(
          (product) => product.category == "Lautsprecher"
        )
      );
    } else if (router.query.category == "Kabellose In‑Ear") {
      setCurrentCat("Kabellose In‑Ear");

      setCatText("Kabellose In-Ear");
      setProduct(() =>
        [...productsAllProducts].filter(
          (product) => product.category == "Kabellose In‑Ear"
        )
      );
    }
  }, [router.query]);

  const handleAll = () => {
    setCurrentCat("Alle Produkte");
    setCatText("Alle Produkte");
    setSort("alphAsc");
    setProduct(productsAllProducts);
  };

  const handleHeadphones = () => {
    setCurrentCat("Kopfhörer");
    setCatText("Kopfhörer");
    setSort("alphAsc");
    setProduct(
      productsAllProducts?.filter((product) => product.category == "Kopfhörer")
    );
  };

  const handleSpeakers = () => {
    setCurrentCat("Lautsprecher");
    setCatText("Lautsprecher");
    setSort("alphAsc");
    setProduct(
      productsAllProducts?.filter(
        (product) => product.category == "Lautsprecher"
      )
    );
  };

  const handleInEar = () => {
    setCurrentCat("Kabellose In‑Ear");
    setCatText("Kabellose In‑Ear");
    setSort("alphAsc");
    setProduct(
      productsAllProducts?.filter(
        (product) => product.category == "Kabellose In‑Ear"
      )
    );
  };

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

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Produkte</title>
      </Head>
      <div className="min-h-[calc(100vh-84px)] bg-slate-100  md:p-8">
        <div className="container m-auto md:p-2 lg:py-16">
          <div className="flex flex-col items-center justify-between p-4 py-2 md:p-0 lg:flex-row">
            <h1 className="py-4 text-4xl font-bold ">{CatText}</h1>
            <div className="flex gap-2">
              <button
                className={
                  currentCat == "Alle Produkte"
                    ? "rounded-lg bg-slate-200 p-2"
                    : "p-2"
                }
                onClick={handleAll}
              >
                Alle Produkte
              </button>
              <button
                className={
                  currentCat == "Kopfhörer"
                    ? "rounded-lg bg-slate-200 p-2"
                    : "p-2"
                }
                onClick={handleHeadphones}
              >
                Kopfhörer
              </button>
              <button
                className={
                  currentCat == "Lautsprecher"
                    ? "rounded-lg bg-slate-200 p-2"
                    : "p-2"
                }
                onClick={handleSpeakers}
              >
                Lautsprecher
              </button>
              <button
                className={
                  currentCat == "Kabellose In‑Ear"
                    ? "rounded-lg bg-slate-200 p-2"
                    : "p-2"
                }
                onClick={handleInEar}
              >
                Kabellose In-Ear
              </button>
            </div>
          </div>
          <hr className="py-1" />
          <div className="flex flex-col items-center justify-between p-4 pb-4 md:p-0 lg:flex-row">
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
          <div className="mb-10 flex items-center justify-center gap-4 px-4 md:px-0 lg:justify-start">
            <label className="text-xl" htmlFor="search">
              Suche:{" "}
            </label>
            <input
              id="search"
              className="w-96 rounded-md border-2 border-slate-400 bg-slate-200"
              type="text"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-14">
            {product
              ?.filter((products) => {
                if (searchValue == "") {
                  return { ...products };
                }
                return products.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              })
              .map((product) => {
                return (
                  <Product key={product.productId.current} product={product} />
                );
              }).length ? (
              product
                ?.filter((products) => {
                  if (searchValue == "") {
                    return { ...products };
                  }
                  return products.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .map((product) => {
                  return (
                    <Product
                      key={product.productId.current}
                      product={product}
                    />
                  );
                })
            ) : (
              <h1>Leider keine Suchergebnisse</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

export const getServerSideProps = async () => {
  const queryAllProducts = '*[_type=="product"] | order(name asc)';

  const productsAllProducts = await client.fetch(queryAllProducts);

  return {
    props: {
      productsAllProducts,
    },
  };
};
