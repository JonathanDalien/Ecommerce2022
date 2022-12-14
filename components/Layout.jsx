import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "../context/StateContext";
import Loading from "./Loading";

const Layout = ({ children }) => {
  const { pageLoading } = useStateContext();

  return pageLoading ? (
    <Loading />
  ) : (
    <>
      <div className="scroll-smooth dark:text-black">
        <Head>
          <title>Electronics.</title>
          <meta name="color-scheme" content="only" />
        </Head>
        <nav>
          <Navbar />
        </nav>
        <main className="main-container">{children}</main>
        <footer className="bg-gray-800 text-white">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
