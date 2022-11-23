import Link from "next/link";
import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="p-16 pb-0">
      <div className="flex pb-4">
        <div className="flex flex-1 flex-col">
          <h1 className="pb-4 text-7xl font-bold">Electronics.</h1>
          <p>
            Powered by Intellect
            <br />
            Driven by Values
          </p>
        </div>
        <div className="flex flex-1 gap-48">
          <div className="flex flex-col">
            <h1 className="pb-3 text-3xl font-semibold">Produkte</h1>
            <Link href="" className="my-3 hover:underline">
              Alle Produkte
            </Link>
            <Link href="" className="my-3 hover:underline">
              Kopföhrer
            </Link>
            <Link href="" className="my-3 hover:underline">
              Lautsprecher
            </Link>
            <Link href="" className="my-3 hover:underline">
              In-Ear
            </Link>
            <Link href="" className="my-3 hover:underline">
              Pods
            </Link>
          </div>
          <div className="flex flex-col">
            <h1 className="pb-3 text-3xl font-semibold">Support</h1>
            <Link href="" className="my-3 hover:underline">
              Angebote
            </Link>
            <Link href="" className="my-3 hover:underline">
              Beliebt
            </Link>
            <Link href="" className="my-3 hover:underline">
              Filiale
            </Link>
          </div>
          <div className="flex flex-col">
            <h1 className="pb-3 text-3xl font-semibold">Über Uns</h1>
            <Link href="" className="my-3 hover:underline">
              Über uns
            </Link>
            <Link href="" className="my-3 hover:underline">
              Support
            </Link>
            <Link href="" className="my-3 hover:underline">
              Widerrufsrecht
            </Link>
            <Link href="" className="my-3 hover:underline">
              Logout
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <p>2022 Jonathan Dalien - All rights reserved</p>
        <p className="text-4xl">
          <Link
            legacyBehavior
            className=""
            href="https://github.com/JonathanDalien/Ecommerce-Headphones"
            passHref
          >
            <a>
              <AiFillGithub />
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
