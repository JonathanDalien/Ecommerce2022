import Head from "next/head";
import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

const Loading = () => {
  return (
    <>
      <Head>
        <title>Electronics.</title>
        <meta name="color-scheme" content="only" />
      </Head>
      <div className="h-screen">
        <div className="border-b-gray2-200 w-screen border-b-2  bg-slate-100 px-3 drop-shadow-md">
          <div className="flex items-center justify-between p-5 px-10">
            <div className=" h-10 w-1 flex-[1] self-start rounded-lg bg-slate-300 text-3xl font-bold"></div>
            <div className="relative hidden flex-[3] justify-center gap-4 md:flex">
              <p
                className="h-10 w-36 rounded-md bg-red-500 p-2 px-3 text-xl text-white transition-all hover:bg-red-400"
                href=""
              >
                <p></p>
              </p>
              <p href="/products" className="flex items-center"></p>
              <p
                className="h-10 w-36 rounded-lg bg-slate-300 p-2 px-3 text-xl hover:bg-slate-50"
                href=""
              >
                <p className=""></p>
              </p>
              <p
                className=" h-10 w-36 rounded-lg bg-slate-300 p-2 px-3 text-xl hover:bg-slate-50"
                href=""
              ></p>
            </div>
            <div className="hidden flex-[1]  justify-end gap-3 md:flex">
              <div className="cart-icon mx-5 !cursor-default">
                <AiOutlineShopping className="" />
                <span className="cart-item-qty">0</span>
              </div>
              <>
                <p
                  className="h-10 w-20 rounded-md bg-slate-200 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
                  href=""
                ></p>
                <p
                  className="h-10 w-20 rounded-md bg-slate-200 p-2 px-3 text-xl text-white transition-all hover:bg-blue-400"
                  href=""
                ></p>
              </>
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh-84px)] bg-slate-200"></div>
      </div>
    </>
  );
};

export default Loading;
