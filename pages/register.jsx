import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";
import { withPublic } from "../route";
import Head from "next/head";
import Link from "next/link";

const schema = yup.object().shape({
  firstName: yup.string().trim().required("Bite gebe deinen Vornamen ein"),
  lastName: yup.string().trim().required("Bite gebe deinen Nachnamen ein"),
  email: yup
    .string()
    .email("Bitte gebe eine gültige Email Adresse ein")
    .required("Bitte gebe deine Email Adresse ein"),
  phoneNumber: yup
    .number("Deine Telefonnumer muss gültig sein")
    .typeError("Deine Telefonnumer muss gültig sein")
    .positive("Deine Telefonnumer muss gültig sein")
    .integer("Deine Telefonnumer muss gültig sein")
    .required("Bitte gebe deine Telefonnummer ein"),
  password: yup
    .string()
    .min(6, "Dein Passwort muss mindestens 6 Zeichen beinhalten")
    .typeError("Dein Passwort muss mindestens 6 Zeichen beinhalten")
    .required("Bitte gebe ein gültiges Passwort ein"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const Register = () => {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    const { firstName, lastName, email, password, phoneNumber } = data;
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        createdAt: Timestamp.fromDate(new Date()),
        isAdmin: false,
      });
      await setDoc(
        doc(db, "shoppingCarts", result.user.uid, "totalQty", "quantity"),
        { quantity: 0 }
      );
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Etwas ist schief gelaufen");
    }
  };

  return (
    <>
      <Head>
        <title>Registrieren</title>
      </Head>
      <div className="w flex min-h-[calc(100vh-86x)] items-center justify-center bg-slate-200 lg:min-h-[calc(100vh-84px)] lg:p-10 xl:p-14">
        <div className="registerform rounded-xl bg-slate-200 py-8 md:w-[80%] lg:w-[60%] lg:bg-white lg:px-16 xl:w-[60%] 2xl:w-[40%]">
          <h1 className="pb-8 text-center text-3xl font-semibold">
            Account erstellen
          </h1>
          <form
            onSubmit={handleSubmit(submitForm)}
            className=" flex flex-col gap-2"
            action=""
          >
            <p className="font-semibold text-red-500">
              {errors?.firstName?.message}
            </p>
            <input
              className={`rounded-lg ${
                errors?.firstName
                  ? "border-2 border-red-500"
                  : "border-2 border-gray-500"
              } py-4 px-3`}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Dein Vorname"
              {...register("firstName")}
            />
            <p className="font-semibold text-red-500">
              {errors?.lastName?.message}
            </p>
            <input
              className={`rounded-lg ${
                errors?.lastName
                  ? "border-2 border-red-500"
                  : "border-2 border-gray-500"
              } py-4 px-3`}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Dein Nachname"
              {...register("lastName")}
            />
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
              {errors?.phoneNumber?.message}
            </p>

            <input
              className={`rounded-lg ${
                errors?.phoneNumber
                  ? "border-2 border-red-500"
                  : "border-2 border-gray-500"
              } py-4 px-3`}
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Deine Telefonnummer"
              {...register("phoneNumber")}
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
            <p className="font-semibold text-red-500">
              {errors?.confirmPassword && "Dein Password muss übereinstimmen"}
            </p>

            <input
              className={`rounded-lg ${
                errors?.confirmPassword
                  ? "border-2 border-red-500"
                  : "border-2 border-gray-500"
              } py-4 px-3`}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Dein Passwort bestätigen"
              {...register("confirmPassword")}
            />
            <p className="text-gray-500">
              Durch deine Registrierung stimmst du unseren Nutzungsbedingungen
              zu.
            </p>
            <button
              className="rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-6 font-semibold text-white transition-all hover:scale-[1.01] hover:from-cyan-500 hover:to-purple-300 disabled:from-cyan-500 disabled:to-purple-300"
              type="submit"
              disabled={loading}
            >
              {loading ? "Bitte warten" : "Jetzt Registrieren"}
            </button>
            {error && <p>{error}</p>}
          </form>
          <p className="my-2 text-gray-600">
            Du hast bereits ein Account? Klicke{" "}
            <Link className="text-blue-600" href="/login">
              Hier
            </Link>{" "}
            um dich anzumelden.
          </p>
        </div>
      </div>
    </>
  );
};

export default withPublic(Register);
