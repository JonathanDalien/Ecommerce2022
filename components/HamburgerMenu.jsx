import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import useMountTransition from "../hooks/useMountTransition ";
import { useRouter } from "next/router";

const HamburgerMenu = ({ isvisible }) => {
  const {
    totalPrice,
    totalQty,
    cartItems,
    setShowCart,
    onRemove,
    user,
    setShowMenu,
  } = useStateContext();

  const hasTransitionedIn = useMountTransition(isvisible, 500);

  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
    setShowMenu(false);
  };

  const handleOuterClick = () => {
    if (hasTransitionedIn) {
      setShowMenu(false);
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
            className={`hamburger-container ${hasTransitionedIn && "in"} ${
              isvisible && "visible"
            }`}
          >
            <div
              className=" mb-10 flex cursor-pointer items-center gap-3 text-xl"
              onClick={() => setShowMenu(false)}
            >
              <AiOutlineClose /> Schließen
            </div>
            <div className="flex flex-col ">
              <p className="border-b-2 border-black bg-slate-100 py-4 px-2  hover:bg-slate-100">
                Angebote
              </p>
              <p className="border-b-2 border-black bg-slate-100 py-4  px-2 hover:bg-slate-100">
                Produkte
              </p>
              <p className="border-b-2 border-black bg-slate-100 py-4  px-2 hover:bg-slate-100">
                Beliebt
              </p>
              <p className="border-b-2 border-black bg-slate-100 py-4  px-2 hover:bg-slate-100">
                Service
              </p>
              {!user ? (
                <>
                  <p className="border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-100">
                    Anmelden
                  </p>
                  <p className="border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-100">
                    Registrieren
                  </p>
                </>
              ) : (
                <>
                  <p className="border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-100">
                    Mein Profil
                  </p>
                  <p className="border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-100">
                    Abmelden
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;

// <img src={urlFor(`${item.colorImages.filter((coloredItems)=>coloredItems.color === item.chosenColor)}`)} alt="" />
