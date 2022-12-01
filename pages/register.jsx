import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { auth, db } from "../lib/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { withProtectedPublic, withPublic } from "../route";

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Bite gebe deinen Vollständigen Namen ein"),
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
    .string("sdasda")
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
    const { name, email, password, phoneNumber } = data;
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        phoneNumber,
        createdAt: Timestamp.fromDate(new Date()),
        isAdmin: false,
      });
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Etwas ist schief gelaufen");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-84px)] items-center justify-center bg-slate-200 p-14">
      <div className="registerform h-[90%] w-[40%] rounded-xl bg-white py-8 px-16">
        <h1 className="pb-8 text-center text-3xl font-semibold">
          Account erstellen
        </h1>
        <form
          onSubmit={handleSubmit(submitForm)}
          className=" flex flex-col gap-5"
          action=""
        >
          <p className="font-semibold text-red-500">{errors?.name?.message}</p>
          <input
            className={`rounded-lg ${
              errors?.name
                ? "border-2 border-red-500"
                : "border-2 border-gray-500"
            } py-4 px-3`}
            type="text"
            name="name"
            id="name"
            placeholder="Dein Name"
            {...register("name")}
          />
          <p className="font-semibold text-red-500">{errors?.email?.message}</p>
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
            Durch deine Registrierung stimmst du unseren Nutzungsbedingungen zu.
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
      </div>
    </div>
  );
};

export default withPublic(Register);
