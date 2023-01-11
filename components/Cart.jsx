import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import useMountTransition from "../hooks/useMountTransition ";
import { useRouter } from "next/router";

const Cart = ({ isvisible }) => {
  const { totalPrice, totalQty, cartItems, setShowCart, onRemove } =
    useStateContext();

  const hasTransitionedIn = useMountTransition(isvisible, 500);

  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
    setShowCart(false);
  };

  const handleOuterClick = () => {
    if (hasTransitionedIn) {
      setShowCart(false);
    }
  };

  return (
    <>
      {(isvisible || hasTransitionedIn) && (
        <>
          <div
            onClick={handleOuterClick}
            className={`cart-wrapper ${hasTransitionedIn && "in"} ${
              isvisible && "visible"
            }`}
          ></div>
        </>
      )}
      {(isvisible || hasTransitionedIn) && (
        <>
          <div
            className={`cart-container ${hasTransitionedIn && "in"} ${
              isvisible && "visible"
            }`}
          >
            {cartItems.length < 1 && (
              <div
                className=" flex cursor-pointer items-center gap-3 text-xl"
                onClick={() => setShowCart(false)}
              >
                <AiOutlineLeft /> Dein Einkaufswagen ist leer
              </div>
            )}
            {cartItems.length > 0 && (
              <>
                <div
                  className=" mb-10 flex cursor-pointer items-center gap-3 text-xl"
                  onClick={() => setShowCart(false)}
                >
                  <AiOutlineLeft /> Dein Einkaufwagen
                  <span className="text-red-500">({totalQty} Produkte)</span>
                </div>
                <div className=" h-[50vh] overflow-auto lg:h-[70vh]">
                  <div className="rounded-lg bg-slate-200 p-4">
                    {cartItems.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="cartProduct flex flex-col pb-4"
                        >
                          <h1 className="text-lg lg:text-xl">{item.name}</h1>
                          <div className="h-1 border-b-2 border-black py-1"></div>
                          <div className=" cartProductDetails flex items-center py-1 px-2 lg:py-3">
                            <div className=" flex-[2] mix-blend-multiply">
                              <img
                                className="h-[80px] w-[80px] object-contain lg:h-[100px] lg:w-[100px]"
                                src={urlFor(
                                  item.colorImages.filter(
                                    (colorItem) =>
                                      colorItem.color === item.chosenColor
                                  )[0].allImage[0]
                                )}
                                alt=""
                              />
                            </div>
                            <div className="flex flex-[1] flex-col items-start gap-2">
                              <div className="flex w-[100%] justify-between text-lg italic">
                                <p>Preis :</p>
                                <div className="flex">
                                  <p>{item.price.toString().split(".")[0]}</p>.
                                  {item.price.toString().split(".")[1] ? (
                                    <p className="text-sm">
                                      {item.price.toString().split(".")[1]}
                                    </p>
                                  ) : (
                                    <p className="text-sm">00</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex w-[100%] justify-between text-lg">
                                <p>Farbe :</p>
                                <p className="italic">{item.chosenColor}</p>
                              </div>
                              <div className="flex w-[100%] justify-between text-lg">
                                <p>Anzahl :</p>
                                <p className="italic">{item.quantity}</p>
                              </div>
                              <button
                                onClick={() => onRemove(item)}
                                className="text-lg text-red-500 underline"
                              >
                                Löschen
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className=" m-4 flex justify-between gap-3 text-xl">
                  <h1 className="font-semibold">Gesamtpreis: </h1>
                  <div className="total flex">
                    <p>{totalPrice.toFixed(2)}€</p>
                  </div>
                </div>
                <div className="buttons flex p-4">
                  <button
                    onClick={handleCheckout}
                    className="flex-[1] rounded-md  bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-6 font-semibold text-white transition-all hover:scale-[1.01] hover:from-cyan-500 hover:to-purple-300 disabled:from-cyan-500 disabled:to-purple-300"
                  >
                    Zum Warenkorb
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

// <img src={urlFor(`${item.colorImages.filter((coloredItems)=>coloredItems.color === item.chosenColor)}`)} alt="" />
