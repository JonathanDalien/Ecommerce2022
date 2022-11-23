import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <nav className="border-b-gray2-200 w-screen border-b-2  bg-slate-100 drop-shadow-md">
      <div className="flex items-center justify-between p-5">
        <Link href="/">
          <h1 className="ml-5 text-3xl font-bold">Electronics.</h1>
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
          <button type="button" className="cart-icon mx-5">
            <AiOutlineShopping />
            <span className="cart-item-qty">2</span>
          </button>
          <Link
            className="rounded-md bg-blue-500 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-md bg-blue-500 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
            href=""
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
