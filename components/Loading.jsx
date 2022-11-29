import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

const Loading = () => {
  return (
    <div>
      <div className="border-b-gray2-200 w-screen border-b-2  bg-slate-100 px-3 drop-shadow-md">
        <div className="flex items-center justify-between p-5 px-10">
          <div className=" h-10 w-36 rounded-lg bg-slate-300 text-3xl font-bold"></div>
          <div className="relative flex space-x-24">
            <Link
              className="h-10 w-36 rounded-md bg-red-500 p-2 px-3 text-xl text-white transition-all hover:bg-red-400"
              href=""
            >
              <p></p>
            </Link>
            <Link
              href="/products"
              className="flex items-center"
              onMouseEnter={() => setShowProducts(true)}
              onMouseLeave={() => setShowProducts(false)}
            ></Link>
            <Link
              className="h-10 w-36 rounded-lg bg-slate-300 p-2 px-3 text-xl hover:bg-slate-50"
              href="/#beliebt"
            >
              <p className=""></p>
            </Link>
            <Link
              className=" h-10 w-36 rounded-lg bg-slate-300 p-2 px-3 text-xl hover:bg-slate-50"
              href=""
            ></Link>
          </div>
          <div className="flex space-x-6">
            <button
              type="button"
              className="cart-icon mx-5"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping />
              <span className="cart-item-qty">0</span>
            </button>
            <>
              <Link
                className="h-10 w-20 rounded-md bg-blue-500 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
                href="/login"
              ></Link>
              <Link
                className="h-10 w-20 rounded-md bg-blue-500 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
                href="/register"
              ></Link>
            </>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-84px)] bg-slate-200"></div>
    </div>
  );
};

export default Loading;
