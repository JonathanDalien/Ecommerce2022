import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import useMountTransition from "../hooks/useMountTransition ";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

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

  const router = useRouter();

  const hasTransitionedIn = useMountTransition(isvisible, 500);

  const handleOuterClick = () => {
    if (hasTransitionedIn) {
      setShowMenu(false);
    }
  };

  const handleLogOut = async () => {
    await signOut(auth);
    router.push("/");
    setShowMenu(false);
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
              className=" mb-5 flex cursor-pointer items-center gap-3 text-xl"
              onClick={() => setShowMenu(false)}
            >
              <AiOutlineClose /> Schließen
            </div>
            <div className="flex flex-col ">
              <Link
                onClick={() => setShowMenu(false)}
                href="/offers"
                className="cursor-pointer border-b-2 border-black bg-slate-100 py-4 px-2  hover:bg-slate-200"
              >
                Angebote
              </Link>
              <Link
                onClick={() => setShowMenu(false)}
                href="/products"
                className="cursor-pointer border-b-2 border-black bg-slate-100 py-4  px-2 hover:bg-slate-200"
              >
                Produkte
              </Link>
              <Link
                onClick={() => setShowMenu(false)}
                href="/#beliebt"
                className="cursor-pointer border-b-2 border-black bg-slate-100 py-4  px-2 hover:bg-slate-200"
              >
                Beliebt
              </Link>
              {!user ? (
                <>
                  <Link
                    onClick={() => setShowMenu(false)}
                    href="/login"
                    className="cursor-pointer border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-200"
                  >
                    Anmelden
                  </Link>
                  <Link
                    onClick={() => setShowMenu(false)}
                    href="/register"
                    className="cursor-pointer border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-200"
                  >
                    Registrieren
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setShowMenu(false)}
                    href="/profile"
                    className="cursor-pointer border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-200"
                  >
                    Mein Profil
                  </Link>
                  <p
                    onClick={handleLogOut}
                    className="cursor-pointer border-b-2 border-black bg-slate-100 py-4 px-2 hover:bg-slate-200"
                  >
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
