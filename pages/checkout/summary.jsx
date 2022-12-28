import React, { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { urlFor } from "../../lib/client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Head from "next/head";
const { v4: uuidv4 } = require("uuid");

const schema = yup.object().shape({
  firstName: yup.string().trim().required("Bitte gebe deine Email Adresse ein"),
  lastName: yup.string().trim().required("Bitte gebe deine Email Adresse ein"),
  postalCode: yup
    .string()
    .required("Gebe deine PLZ ein")
    .matches("^[0-9]+$", "Darf nur Nummern enthalten")
    .min(5, "Muss 5 Zeichen Lang sein")
    .max(5, "Muss 5 Zeichen Lang sein"),
  city: yup.string().trim().required("Bitte gebe deine Email Adresse ein"),
  street: yup.string().trim().required("Bitte gebe deine Email Adresse ein"),
  houseNumber: yup.number().required("Bitte gebe deine Email Adresse ein"),
  email: yup
    .string()
    .trim()
    .email("Bitte gebe eine gültige Email Adresse ein")
    .required("Bitte gebe deine Email Adresse ein"),
});

const Summary = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const {
    totalPrice,
    cartItems,
    user,
    shippingData,
    onRemove,
    setCartItems,
    setTotalQty,
    emptyCartFireBase,
    totalQty,
  } = useStateContext();

  async function mutate(mutations) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_SANITY_URL}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
      },
      body: JSON.stringify(mutations),
      method: "POST",
    });

    const json = await result.json();
    return json;
  }

  const patch = cartItems.map((item) => {
    return {
      patch: {
        id: item._id,
        dec: {
          [`colorImages[${item.selectedColorId}].productQuantity`]: 1,
        },
      },
    };
  });

  const mutations = {
    mutations: patch,
  };

  const initialOptions = {
    "client-id":
      "AdNHdry9mY0FPKHKpoMCH9GFy_RB1rqXBMAFHFgSzgdYaSjKtAwxfPGJ4jz3ymMzTImlRjMGITsn-c8N",
    currency: "EUR",
    intent: "capture",
  };

  return (
    <>
      <Head>
        <title>Lieferübersicht</title>
      </Head>
      {cartItems.length > 0 && user && shippingData ? (
        <div className="min-h-[calc(100vh-84px)] bg-slate-100">
          <div className="container m-auto p-10">
            <h1 className="pb-10 text-center text-3xl font-bold">Übersicht</h1>
            <div className="flex flex-col-reverse justify-center gap-10 lg:flex-row">
              <div className="left flex flex-col  gap-10">
                <div className=" flex max-w-[650px] flex-wrap items-center justify-center gap-10 xl:items-start xl:justify-start">
                  <div className=" flex min-w-[300px] flex-col items-center justify-center rounded-lg  border-[1px] border-gray-500 p-4 xl:items-start xl:justify-start">
                    <p className="font-semibold">Lieferadresse</p>
                    <div className="flex gap-1">
                      <p>{shippingData.firstName}</p>
                      <p>{shippingData.lastName}</p>
                    </div>
                    <div className="flex gap-1">
                      <p>{shippingData.street}</p>
                      <p>{shippingData.houseNumber}</p>
                    </div>
                    <div className="flex gap-1">
                      <p>{shippingData.postalCode}</p>
                      <p>{shippingData.city}</p>
                    </div>
                    <p>{shippingData.email}</p>
                    <div className="xl:self-start">
                      <p
                        onClick={() => router.push("/checkout/address")}
                        className=" cursor-pointer py-1 underline"
                      >
                        Ändern
                      </p>
                    </div>
                  </div>
                  <div className=" flex min-w-[300px] flex-col items-center justify-center rounded-lg border-[1px] border-gray-500 p-4 xl:items-start xl:justify-start">
                    <p className="font-semibold">Rechnungsadresse</p>
                    <div className="flex gap-1">
                      <p>{shippingData.firstName}</p>
                      <p>{shippingData.lastName}</p>
                    </div>
                    <div className="flex gap-1">
                      <p>{shippingData.street}</p>
                      <p>{shippingData.houseNumber}</p>
                    </div>
                    <div className="flex gap-1">
                      <p>{shippingData.postalCode}</p>
                      <p>{shippingData.city}</p>
                    </div>
                    <p>{shippingData.email}</p>
                    <div className="xl:self-start">
                      <p
                        onClick={() => router.push("/checkout/address")}
                        className=" cursor-pointer py-1 underline"
                      >
                        Ändern
                      </p>
                    </div>
                  </div>
                  <div className=" flex min-w-[300px] flex-col items-center justify-center rounded-lg border-[1px] border-gray-500 p-4 xl:items-start xl:justify-start">
                    <p className="font-semibold">Bezahlung</p>
                    <p>Paypal</p>
                  </div>
                </div>
                <div className="items">
                  <p className="pb-4 text-lg font-semibold">Artikel</p>
                  <div className="checkout-details flex flex-col gap-3">
                    {cartItems.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="border-gray flex items-center gap-10 rounded-xl border-[1px] p-10"
                        >
                          <div className="product_img">
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
                </div>
              </div>
              <div>
                <div className="summary md:min-w-[500px] ">
                  <div className="border-gray flex  flex-col  gap-1 rounded-xl border-[1px] p-2 md:p-10">
                    <p className="text-xl font-bold">Zusammenfassung</p>
                    <div className="my-2 h-2 self-stretch border-t-2 border-gray-500"></div>
                    <p className="text-gray-500 md:hidden">
                      {totalQty === 1
                        ? `${totalQty} Produkt`
                        : `${totalQty} Produkte`}{" "}
                      (Siehe unten)
                    </p>
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
                    <div className="text-red-400">
                      <p>Da Developmenphase diese Paypaldaten nutzen:</p>
                      <p className="font-semibold">
                        Email: Electronicsse@gmail.com
                      </p>
                      <p className="font-semibold">Passwort: ElectronicsSe</p>
                    </div>
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order
                            .create({
                              payer: {
                                address: {
                                  postal_code:
                                    shippingData.postalCode.toString(),
                                  address_line_1: shippingData.street,
                                  address_line_2:
                                    shippingData.houseNumber.toString(),
                                  country_code: "DE",
                                  admin_area_1: shippingData.city,
                                  admin_area_2: shippingData.city,
                                },
                                name: {
                                  given_name: shippingData.firstName,
                                  surname: shippingData.lastName,
                                },
                                email_address: "jeanmartin@email.com",
                              },
                              purchase_units: [
                                {
                                  shipping: {
                                    address: {
                                      postal_code:
                                        shippingData.postalCode.toString(),
                                      address_line_1: shippingData.street,
                                      address_line_2:
                                        shippingData.houseNumber.toString(),
                                      country_code: "DE",
                                      admin_area_1: shippingData.city,
                                      admin_area_2: shippingData.city,
                                    },
                                  },

                                  shipping_address: {
                                    recipient_name: `${shippingData.firstName} ${shippingData.lastName}`,
                                    default_address: true,
                                    preferred_address: true,
                                    primary_address: true,
                                    disable_for_transaction: false,
                                    line1: shippingData.street,
                                    line2: shippingData.houseNumber,
                                    city: shippingData.city,
                                    country_code: "DE",
                                    postal_code: shippingData.postalCode,
                                  },
                                  payer_info: {
                                    email: shippingData.email,
                                    first_name: shippingData.firstName,
                                    last_name: shippingData.lastName,
                                    country_code: "DE",
                                    shipping_address: {
                                      recipient_name: `${shippingData.firstName} ${shippingData.lastName}`,
                                      line1: shippingData.street,
                                      line2: shippingData.houseNumber,
                                      city: shippingData.city,
                                      country_code: "DE",
                                      postal_code: shippingData.postalCode,
                                    },
                                  },
                                  description: "Electronics. SE",
                                  amount: {
                                    currency_code: "EUR",
                                    value: totalPrice.toFixed(2),
                                  },
                                  address: {
                                    address_line_1: shippingData.street,
                                    address_line_2: shippingData.houseNumber,
                                    admin_area_1: shippingData.city,
                                    postal_code: shippingData.postalCode,
                                    country_code: "DE",
                                  },
                                },
                              ],
                            })
                            .then((orderId) => {
                              return orderId;
                            });
                        }}
                        onApprove={async function (data, actions) {
                          const order = await actions.order.capture();
                          const orderRef = collection(db, "orders");

                          return actions.order
                            .capture()
                            .then(async function () {
                              // Your code here after capture the order
                              try {
                                await addDoc(orderRef, {
                                  uId: uuidv4(),
                                  firstName: shippingData.firstName,
                                  lastName: shippingData.lastName,
                                  email: shippingData.email,
                                  orderId: order.id,
                                  items: [...cartItems],
                                  status: order.status,
                                  create_time: order.create_time,
                                  address: { ...order.payer.address },
                                  totalPrice: totalPrice,
                                  statusCode: 0,
                                  userId: user.uid,
                                })
                                  .then(mutate(mutations))
                                  .then(setCartItems([]))
                                  .then(setTotalQty(0))
                                  .then(emptyCartFireBase())
                                  .then(router.prefetch(`/orders/${order.id}`))
                                  .then(router.push(`/orders/${order.id}`));
                              } catch (error) {}
                            });
                        }}
                        onCancel={() => {}}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[calc(100vh-84px)] flex-col items-center justify-start bg-slate-100 p-24">
          <h1 className="text-8xl">{<AiOutlineShoppingCart />}</h1>
          <h1 className="py-5 text-5xl">Warenkorb</h1>
          <p className="py-1">
            In Ihrem Warenkorb befinden sich keine Produkte.{" "}
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

export default Summary;
