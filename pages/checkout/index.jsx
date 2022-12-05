import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../lib/client";

const Checkout = () => {
  const { cartItems, totalPrice, onRemove, user } = useStateContext();
  const router = useRouter();

  const handleCheckout = () => {
    user ? router.push("checkout/address") : router.push("checkout/login");
  };

  return (
    <>
      {cartItems.length > 0 && (
        <div className="min-h-[calc(100vh-84px)] bg-slate-100">
          <div className="checkout_container container m-auto p-10">
            <h1 className="text-center text-3xl font-bold">Warenkorb</h1>
            <h3 className="pb-10 text-center">
              {cartItems.length < 2
                ? `${cartItems.length} Produkt`
                : `${cartItems.length} Produkte`}
            </h3>

            <div className="flex flex-col-reverse items-center justify-center gap-10 lg:flex-row lg:items-start">
              <div className="checkout-details flex flex-col gap-3">
                {cartItems.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="border-gray flex items-center gap-10 rounded-xl border-[1px] p-10"
                    >
                      <div className="product_img relative">
                        <p className="absolute -top-6 right-0 rounded-lg border-2 border-black py-1 px-2 ">
                          {item.quantity}
                        </p>
                        <img
                          className="h-[150px] w-[150px] object-contain mix-blend-multiply"
                          src={urlFor(
                            item.colorImages.filter(
                              (colorItem) =>
                                colorItem.color === item.chosenColor
                            )[0].allImage[0]
                          )}
                          alt=""
                        />
                      </div>
                      <div className="product_detail flex flex-col gap-2">
                        <p className="text-sm">{item.brand}</p>
                        <p className="text-lg">{item.name}</p>
                        <p className="text-lg">{item.chosenColor}</p>

                        <p className="text-lg">{item.price} €</p>
                        <p
                          onClick={() => onRemove(item)}
                          className="cursor-pointer underline"
                        >
                          Löschen
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="summary min-w-[400px] lg:min-w-[500px] ">
                <div className="border-gray flex  flex-col  gap-1 rounded-xl border-[1px] p-10">
                  <p className="text-xl font-bold">Zusammenfassung</p>
                  <div className="my-2 h-2 self-stretch border-t-2 border-gray-500"></div>
                  <div className="flex justify-between">
                    <p>Zwischensumme</p>
                    <p>{totalPrice.toFixed(2)} €</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Lieferkosten</p>
                    <p>Gratis</p>
                  </div>
                  <div className="my-2 h-2 self-stretch border-t-2 border-gray-500"></div>
                  <div className="flex justify-between">
                    <p className="text-xl font-bold">Gesamtsumme</p>
                    <p className="text-xl font-bold">
                      {totalPrice.toFixed(2)} €
                    </p>
                  </div>
                  <p className="text-sm">inkl. MwSt.</p>
                  <button
                    onClick={handleCheckout}
                    className="my-4 rounded-md bg-gradient-to-r from-red-600 to-yellow-400 p-4 px-6 font-semibold text-white transition-all hover:scale-[1.01] hover:from-red-500 hover:to-yellow-300 disabled:from-cyan-500 disabled:to-purple-300"
                  >
                    Zur Kasse gehen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {cartItems.length < 1 && (
        <div className="flex min-h-[calc(100vh-84px)] flex-col items-center justify-start bg-slate-100 p-24">
          <h1 className="text-8xl">{<AiOutlineShoppingCart />}</h1>
          <h1 className="py-5 text-5xl">Warenkorb</h1>
          <p className="py-1">
            In Ihrem Warenkorb befinden sich keine Produkte.
          </p>
          <p className="py-1">
            Befüllen Sie den Warenkorb mit einem unserer Angebote.
          </p>
          <button
            onClick={() => router.push("/")}
            className="my-4 rounded-md bg-gradient-to-r from-red-600 to-yellow-400 p-4 px-20 font-semibold text-white transition-all hover:scale-[1.01] hover:from-red-500 hover:to-yellow-300 disabled:from-cyan-500 disabled:to-purple-300"
          >
            Weiter Einkaufen
          </button>
        </div>
      )}
    </>
  );
};

export default Checkout;
