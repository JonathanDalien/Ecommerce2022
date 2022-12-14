import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { auth } from "../lib/firebase";

const Footer = () => {
  const { user, setUser } = useStateContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <div className="hidden p-16 pb-10 lg:block">
        <div className="flex pb-4">
          <div className="flex flex-1 flex-col">
            <h1 className="pb-4 text-7xl font-bold">Electronics.</h1>
            <p>
              Powered by Intellect
              <br />
              Driven by Values
            </p>
          </div>
          <div className="flex md:gap-28">
            <div className="flex flex-col">
              <h1 className="pb-3 text-3xl font-semibold">Produkte</h1>
              <Link href="/products" className="my-3 hover:underline">
                Alle Produkte
              </Link>
              <Link
                href="/products?category=Kopfhörer"
                className="my-3 hover:underline"
              >
                Kopföhrer
              </Link>
              <Link
                href="/products?category=Lautsprecher"
                className="my-3 hover:underline"
              >
                Lautsprecher
              </Link>
              <Link
                href="/products?category=Kabellose In‑Ear"
                className="my-3 hover:underline"
              >
                In-Ear
              </Link>
            </div>
            <div className="flex flex-col">
              <h1 className="pb-3 text-3xl font-semibold">Service</h1>
              <Link href="/offers" className="my-3 hover:underline">
                Angebote
              </Link>
              <Link href="/#beliebt" className="my-3 hover:underline">
                Beliebte Produkte
              </Link>
            </div>
            <div className="flex flex-col">
              <h1 className="pb-3 text-3xl font-semibold">Über Uns</h1>
              <Link href="/aboutus" className="my-3 hover:underline">
                Über uns
              </Link>
              <Link href="/support" className="my-3 hover:underline">
                Support
              </Link>
              <Link
                href="/aboutus/widerrufsrecht"
                className="my-3 hover:underline"
              >
                Widerrufsrecht
              </Link>
              {user ? (
                <>
                  <button
                    onClick={handleSignOut}
                    className="my-3 text-start hover:underline"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className="my-3 text-start hover:underline"
                  >
                    Anmelden
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="my-3 text-start hover:underline"
                  >
                    Registrieren
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col items-center justify-center gap-2 pt-8">
          <p>2022 Jonathan Dalien - All rights reserved</p>
          <p className="text-4xl">
            <Link
              legacyBehavior
              className=""
              href="https://github.com/JonathanDalien/Ecommerce2022"
              passHref
            >
              <a>
                <AiFillGithub />
              </a>
            </Link>
          </p>
        </div>
      </div>
      <div className=" p-4 pb-0 lg:hidden">
        <div className="flex flex-col  justify-center pb-8">
          <div className="flex flex-col items-center pb-8">
            <h1 className="pb-4 text-7xl font-bold">Electronics.</h1>
            <p>
              Powered by Intellect
              <br />
              Driven by Values
            </p>
          </div>
          <div className="flex items-start justify-between md:gap-28">
            <div className="flex flex-col">
              <h1 className="pb-3 text-2xl font-semibold md:text-3xl">
                Produkte
              </h1>
              <Link href="products" className="my-3 hover:underline">
                Alle Produkte
              </Link>
              <Link
                href="products?category=Kopfhörer"
                className="my-3 hover:underline"
              >
                Kopföhrer
              </Link>
              <Link
                href="products?category=Lautsprecher"
                className="my-3 hover:underline"
              >
                Lautsprecher
              </Link>
              <Link
                href="products?category=Kabellose In‑Ear"
                className="my-3 hover:underline"
              >
                In-Ear
              </Link>
            </div>
            <div className="flex flex-col">
              <h1 className="pb-3 text-2xl font-semibold md:text-3xl">
                Service
              </h1>
              <Link href="" className="my-3 hover:underline">
                Angebote
              </Link>
              <Link href="#beliebt" className="my-3 hover:underline">
                Beliebt
              </Link>
              <Link href="" className="my-3 hover:underline">
                Filiale
              </Link>
            </div>
            <div className="flex flex-col">
              <h1 className="pb-3 text-2xl font-semibold md:text-3xl">
                Über Uns
              </h1>
              <Link href="" className="my-3 hover:underline">
                Über uns
              </Link>
              <Link href="/support" className="my-3 hover:underline">
                Support
              </Link>
              <Link
                href="aboutus/widerrufsrecht"
                className="my-3 hover:underline"
              >
                Widerrufsrecht
              </Link>
              {user ? (
                <>
                  <button className="my-3 text-start hover:underline">
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <button className="my-3 text-start hover:underline">
                    Anmelden
                  </button>
                  <button className="my-3 text-start hover:underline">
                    Registrieren
                  </button>
                </>
              )}
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
              href="https://github.com/JonathanDalien/Ecommerce2022"
              passHref
            >
              <a>
                <AiFillGithub />
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
