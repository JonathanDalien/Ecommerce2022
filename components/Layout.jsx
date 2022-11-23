import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout overflow-hidden scroll-smooth">
      <Head>
        <title>Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer className="bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
