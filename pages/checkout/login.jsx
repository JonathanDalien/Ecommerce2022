import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Bitte gebe eine gültige Email Adresse ein")
    .required("Bitte gebe deine Email Adresse ein"),
  password: yup
    .string("sdasda")
    .min(6, "Dein Passwort muss länger als 5 Zeichen sein")
    .typeError("Dein Passwort muss länger als 5 Zeichen sein")
    .required("Bitte gebe ein gültiges Passwort ein"),
});

const CheckoutLogin = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { cartItems } = useStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/checkout/address");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Überprüfe deine Email & dein Passwort!");
    }
  };

  return (
    <>
      {cartItems.length > 0 && (
        <div className="flex min-h-[calc(100vh-84px)] items-center justify-center bg-slate-200 lg:p-14">
          <div className="registerform h-[90%] w-[100%] rounded-xl bg-slate-200 py-8 lg:w-[40%] lg:bg-white lg:px-16">
            <h1 className="text-center text-3xl font-semibold">Anmelden </h1>
            {error && (
              <p className="py-4  text-center font-bold text-red-500">
                {error}
              </p>
            )}
            <form
              onSubmit={handleSubmit(submitForm)}
              className=" flex flex-col gap-5"
              action=""
            >
              <p className="font-semibold text-red-500">
                {errors?.email?.message}
              </p>
              <input
                className={`rounded-lg ${
                  errors?.email
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-500"
                } py-4 px-3`}
                type="text"
                name="email"
                id="email"
                placeholder="Deine Email Adresse"
                {...register("email")}
              />
              <p className="font-semibold text-red-500">
                {errors?.password?.message}
              </p>
              <input
                className={`rounded-lg ${
                  errors?.password
                    ? "border-2 border-red-500"
                    : "border-2 border-gray-500"
                } py-4 px-3`}
                type="password"
                name="password"
                id="password"
                placeholder="Dein Passwort"
                {...register("password")}
              />
              <button
                className={`rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-6 font-semibold text-white transition-all hover:scale-[1.01] hover:from-cyan-500 hover:to-purple-300 disabled:from-cyan-500 disabled:to-purple-300`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Bitte warten" : "Anmelden"}
              </button>
            </form>
          </div>
        </div>
      )}
      {cartItems.length < 1 && (
        <div className="flex min-h-[calc(100vh-84px)] flex-col items-center justify-start bg-slate-100 p-24">
          <h1 className="text-8xl">{<AiOutlineShoppingCart />}</h1>
          <h1 className="py-5 text-5xl">Warenkorb</h1>
          <p className="py-1">
            In Ihrem Warenkorb befinden sich keine Produkte.{" "}
          </p>
          <p className="py-1">
            Befüllen Sie den Warenkorb mit einem unserer Angebote.
          </p>
          <button className="my-4 rounded-md bg-gradient-to-r from-red-600 to-yellow-400 p-4 px-20 font-semibold text-white transition-all hover:scale-[1.01] hover:from-red-500 hover:to-yellow-300 disabled:from-cyan-500 disabled:to-purple-300">
            Weiter Einkaufen
          </button>
        </div>
      )}
    </>
  );
};

export default CheckoutLogin;
