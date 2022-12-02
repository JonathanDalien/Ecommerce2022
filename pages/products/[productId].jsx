import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import img from "../../assets/MMT73.jpg";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";

const DetailPage = ({ product }) => {
  const { onAdd, cartItems, showCart } = useStateContext();

  console.log(product);

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [selectedPreviewId, setSelectedPreviewId] = useState(0);
  const [color, setColor] = useState(
    product.colorImages[selectedColorId].color
  );

  const handleColorId = (id) => {
    setSelectedPreviewId(0);
    setSelectedColorId(id);
    setColor(product.colorImages[id].color);
  };

  const handlePreviewId = (id) => {
    setSelectedPreviewId(id);
  };
  return (
    <>
      <div className="min-h-[calc(100vh-84px)] bg-slate-200">
        <div className="flex flex-col gap-20">
          <div className="flex flex-[4] items-center justify-center gap-48 p-24 pb-0">
            <div className=" picture relative flex h-[500px] w-[500px] items-center justify-center rounded-xl">
              {product.isSale && (
                <p className="absolute top-0 right-0 rounded-lg bg-gradient-to-r from-red-600 to-orange-400 p-2 text-lg font-semibold text-white ">
                  Im Angebot
                </p>
              )}

              <img
                className="h-[100%] w-[100%] object-contain mix-blend-multiply"
                src={urlFor(
                  product.colorImages[selectedColorId].allImage[
                    selectedPreviewId
                  ]
                )}
              />
            </div>
            <div className="details flex flex-col items-center gap-2">
              <h1 className="text-lg font-semibold">{product.brand}</h1>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <h1 className="my-3 text-5xl">{product.category}</h1>
              <div>
                {product.isSale ? (
                  <>
                    <p className="my-1 line-through">{product.oldPrice}€</p>
                    <p className="my-1 text-xl font-semibold text-red-500">
                      {product.price}€
                    </p>
                  </>
                ) : (
                  <p className="my-1">{product.price}€</p>
                )}
              </div>
              <p className="my-1">Free Shipping</p>
              <div className="my-2 flex gap-6">
                {product.colorImages.map((product, i) => {
                  return (
                    <div
                      key={i}
                      className="flex cursor-pointer flex-col items-center"
                      onClick={() => handleColorId(i)}
                    >
                      <div
                        className={
                          selectedColorId == i
                            ? "rounded-lg bg-gradient-to-r from-cyan-600 to-purple-400"
                            : ""
                        }
                      >
                        <div className="flex h-20 w-20 flex-col items-center justify-center ">
                          <div className="h-[95%] w-[95%] rounded-lg bg-white ">
                            <img
                              className={
                                selectedColorId == i
                                  ? `h-[100%] w-[100%] object-contain mix-blend-multiply transition-all`
                                  : `h-[100%] w-[100%] object-contain opacity-50 mix-blend-multiply transition-all`
                              }
                              src={urlFor(product.allImage[0])}
                            />
                          </div>
                        </div>
                      </div>
                      <p>{product.color}</p>
                    </div>
                  );
                })}
              </div>
              {product.isStock ? (
                <button
                  onClick={() => onAdd(product, color)}
                  type="button"
                  className="rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-6 font-semibold text-white transition-all hover:scale-105 hover:from-cyan-500 hover:to-purple-300"
                >
                  In den Einkaufswagen
                </button>
              ) : (
                <button
                  disabled
                  type="button"
                  className="rounded-md bg-gradient-to-r  from-cyan-500 to-purple-300 p-4 px-6 font-semibold text-white"
                >
                  Ausverkauft
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-[1] justify-center gap-3">
            {product.colorImages[selectedColorId].allImage.map((image, i) => {
              return (
                <div key={i} className="h-20 w-20 rounded-lg bg-white">
                  <img
                    onMouseEnter={() => {
                      handlePreviewId(i);
                    }}
                    className="h-[100%] w-[100%] rounded-lg object-contain  opacity-70 mix-blend-multiply transition-all hover:opacity-100"
                    src={urlFor(image)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="details-section bg-slate-200 px-24 pb-24">
        <h1 className="py-4 text-5xl">Beschreibung</h1>
        <div className="h-2 border-b-2 border-slate-500"></div>
        <div className="py-4 text-lg leading-loose tracking-widest">
          {product.details}
        </div>
      </div>
    </>
  );
};

export default DetailPage;

export const getServerSideProps = async (context) => {
  const { params, res, req } = context;
  const { productId } = params;
  const productQuery = `*[_type=="product" && productId.current == '${productId}'][0]`;
  const product = await client.fetch(productQuery);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: { product },
  };
};
