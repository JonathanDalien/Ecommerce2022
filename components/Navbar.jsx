import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import DropDownMenu from "./DropDownMenu";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
const Navbar = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [dataBaseCart, setDataBaseCart] = useState([]);

  const router = useRouter();

  const {
    totalQty,
    showCart,
    setShowCart,
    user,
    setTotalQty,
    setCartItems,
    cartItems,
    setUser,
  } = useStateContext();

  console.log(user);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");
  };

  // useEffect(() => {
  //   const updateCart = async () => {
  //     user
  //       ? await setDoc(doc(db, "shoppingCarts", user.uid), {
  //           uid: user.uid,
  //           createdAt: Timestamp.fromDate(new Date()),
  //           cart: [...cartItems],
  //           totalQty,
  //         })
  //       : "";
  //   };
  //   updateCart();
  // }, [cartItems]);

  // useEffect(() => {
  //   const getCart = async () => {
  //     const docRef = doc(db, "shoppingCarts", user.uid);
  //     const q = query(docRef,where("cart", "array-contains", {uid: "8428a950-22c6-414a-a8f3-ad8367a74ea5",})
  //     );
  //     const docSnap = await getDoc(q);

  //     if (docSnap.exists()) {
  //       console.log("first");
  //     }
  //   };
  //   getCart();
  // }, []);

  return (
    <>
      <div className="border-b-gray2-200 w-screen border-b-2  bg-slate-100 px-3 drop-shadow-md">
        <div className="flex items-center justify-between p-5 px-10">
          <Link href="/">
            <h1 className=" text-3xl font-bold">Electronics.</h1>
          </Link>
          <div className="relative flex space-x-24">
            <Link
              className="rounded-md bg-red-500 p-2 px-3 text-xl text-white transition-all hover:bg-red-400"
              href=""
            >
              <p>Im Angebot</p>
            </Link>
            <Link
              href="/products"
              className="flex items-center"
              onMouseEnter={() => setShowProducts(true)}
              onMouseLeave={() => setShowProducts(false)}
            >
              <DropDownMenu />
            </Link>
            <Link
              className="rounded-lg p-2 px-3 text-xl hover:bg-slate-50"
              href="/#beliebt"
            >
              <p className="">Beliebt</p>
            </Link>
            <Link
              className="rounded-lg p-2 px-3 text-xl hover:bg-slate-50"
              href=""
            >
              Service
            </Link>
          </div>
          <div className="flex space-x-6">
            <button
              type="button"
              className="cart-icon mx-5"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping />
              <span className="cart-item-qty">{totalQty}</span>
            </button>

            {user ? (
              <>
                <Link href={`/profile`} className="p-2 text-xl">
                  <p>Profil</p>
                </Link>
                <button
                  onClick={handleSignOut}
                  className=" rounded-md  p-2 px-3 text-xl  transition-all hover:bg-slate-200"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-md bg-blue-500 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="rounded-md bg-blue-500 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
                  href="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Cart isvisible={showCart} />
    </>
  );
};

export default Navbar;
