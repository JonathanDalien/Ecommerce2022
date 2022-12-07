import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { onAuthStateChanged } from "firebase/auth";
import { withPublic } from "../route";
import Head from "next/head";
import Link from "next/link";

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

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useStateContext();

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
      router.push("/");
    } catch (error) {
      setLoading(false);
      setError("Überprüfe deine Email & dein Passwort!");
    }
  };

  return (
    <>
      <Head>
        <title>Anmelden</title>
      </Head>
      <div className="flex min-h-[calc(100vh-84px)] items-center justify-center bg-slate-200 lg:p-14">
        <div className="registerform h-[90%] w-[100%] rounded-xl bg-slate-200 py-8 md:w-[80%] md:bg-white md:px-16 lg:w-[80%] xl:w-[50%]">
          <h1 className="text-center text-3xl font-semibold">Anmelden </h1>
          {error && (
            <p className="py-4  text-center font-bold text-red-500">{error}</p>
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
          <p className="my-2 text-gray-600">
            Noch kein Account? Klicke{" "}
            <Link className="text-blue-600" href="/register">
              Hier
            </Link>{" "}
            um dich zu registrieren.
          </p>
        </div>
      </div>
    </>
  );
};

export default withPublic(Login);
