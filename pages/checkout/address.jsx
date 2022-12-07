import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { AiOutlineShoppingCart } from "react-icons/ai";

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
  houseNumber: yup
    .number("Bitte gebe eine Gültige Hausnummer ein")
    .required("Bitte gebe deine deine Hausnummer ein")
    .typeError("Bitte gebe deine Hausnummer ein"),
  email: yup
    .string()
    .trim()
    .email("Bitte gebe eine gültige Email Adresse ein")
    .required("Bitte gebe deine Email Adresse ein"),
});

const Address = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { totalPrice, cartItems, user, setShippingData } = useStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    setData(data);
    router.push("/checkout/summary");
    setShippingData(data);
  };

  return (
    <>
      {cartItems.length > 0 && user ? (
        <div className="min-h-[calc(100vh-84px)] bg-slate-100">
          <div className="container m-auto p-2 md:p-24">
            <h1 className="py-4 text-2xl font-bold">Versanddetails</h1>
            <div className="">
              <form
                onSubmit={handleSubmit(submitForm)}
                className="flex flex-col justify-center gap-10  py-10 lg:flex-row"
                action=""
              >
                <div className="flex w-[100%] flex-col">
                  <h1 className="text-xl font-semibold">Lieferadresse</h1>
                  <p className="font-semibold text-red-500">
                    {errors?.firstName?.message}
                  </p>
                  <label className="text-sm" htmlFor="firstName">
                    Vorname
                  </label>
                  <input
                    {...register("firstName")}
                    className={`rounded-lg bg-transparent ${
                      errors?.firstName
                        ? "border-b-2 border-red-500"
                        : "border-b-2 border-gray-500"
                    } py-4 px-3`}
                    type="text"
                    name="firstName"
                    id="firstName"
                  />
                  <p className="font-semibold text-red-500">
                    {errors?.lastName?.message}
                  </p>
                  <label className="text-sm" htmlFor="lastName">
                    Nachname
                  </label>
                  <input
                    {...register("lastName")}
                    className={`rounded-lg bg-transparent ${
                      errors?.lastName
                        ? "border-b-2 border-red-500"
                        : "border-b-2 border-gray-500"
                    } py-4 px-3`}
                    type="text"
                    name="lastName"
                    id="lastName"
                  />
                  <div className="flex gap-4">
                    <div className="flex flex-[1] flex-col">
                      <p className="font-semibold text-red-500">
                        {errors?.postalCode?.message}
                      </p>
                      <label className="text-sm" htmlFor="postalCode">
                        PLZ
                      </label>
                      <input
                        {...register("postalCode")}
                        className={`rounded-lg bg-transparent ${
                          errors?.postalCode
                            ? "border-b-2 border-red-500"
                            : "border-b-2 border-gray-500"
                        } py-4 px-3`}
                        type="text"
                        name="postalCode"
                        id="postalCode"
                      />
                    </div>
                    <div className=" flex flex-[3] flex-col">
                      <p className="font-semibold text-red-500">
                        {errors?.city?.message}
                      </p>
                      <label className="text-sm" htmlFor="city">
                        Stadt
                      </label>
                      <input
                        {...register("city")}
                        className={`rounded-lg bg-transparent ${
                          errors?.city
                            ? "border-b-2 border-red-500"
                            : "border-b-2 border-gray-500"
                        } py-4 px-3`}
                        type="text"
                        name="city"
                        id="city"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-[3] flex-col">
                      <p className="font-semibold text-red-500">
                        {errors?.street?.message}
                      </p>
                      <label className="text-sm" htmlFor="street">
                        Straße
                      </label>
                      <input
                        {...register("street")}
                        className={`rounded-lg bg-transparent ${
                          errors?.street
                            ? "border-b-2 border-red-500"
                            : "border-b-2 border-gray-500"
                        } py-4 px-3`}
                        type="text"
                        name="street"
                        id="street"
                      />
                    </div>
                    <div className=" flex flex-[1] flex-col">
                      <p className="font-semibold text-red-500">
                        {errors?.houseNumber?.message}
                      </p>
                      <label className="text-sm" htmlFor="houseNumber">
                        Hausnr.
                      </label>
                      <input
                        {...register("houseNumber")}
                        className={`rounded-lg bg-transparent ${
                          errors?.houseNumber
                            ? "border-b-2 border-red-500"
                            : "border-b-2 border-gray-500"
                        } py-4 px-3`}
                        type="text"
                        name="houseNumber"
                        id="houseNumber"
                      />
                    </div>
                  </div>
                  <p className="font-semibold text-red-500">
                    {errors?.email?.message}
                  </p>
                  <label className="text-sm" htmlFor="email">
                    E-Mail
                  </label>
                  <input
                    {...register("email")}
                    className={`rounded-lg bg-transparent ${
                      errors?.lastName
                        ? "border-b-2 border-red-500"
                        : "border-b-2 border-gray-500"
                    } py-4 px-3`}
                    type="text"
                    name="email"
                    id="email"
                  />
                </div>
                <div>
                  <div className="summary sm:min-w-[500px] ">
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
                        type="submit"
                        className="my-4 rounded-md bg-gradient-to-r from-red-600 to-yellow-400 p-4 px-6 font-semibold text-white transition-all hover:scale-[1.01] hover:from-red-500 hover:to-yellow-300 disabled:from-cyan-500 disabled:to-purple-300"
                      >
                        Zur Kasse gehen
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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

export default Address;
