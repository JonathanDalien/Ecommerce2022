import Link from "next/link";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  oldPassword: yup
    .string("")
    .min(6, "Dein Passwort muss länger als 5 Zeichen sein")
    .typeError("Dein Passwort muss länger als 5 Zeichen sein")
    .required("Bitte gebe ein gültiges Passwort ein"),
  password: yup
    .string("")
    .min(6, "Dein Passwort muss länger als 5 Zeichen sein")
    .typeError("Dein Passwort muss länger als 5 Zeichen sein")
    .required("Bitte gebe ein gültiges Passwort ein"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const ProfileInfo = ({ data }) => {
  const [shownData, setShownData] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (formData) => {
    const { password, oldPassword } = formData;
    const user = auth.currentUser;
    setLoading(true);
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPassword
    );
    try {
      const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );
      if (result.user) {
        await updatePassword(user, password);
      }
      toast.success("Passwort aktualisiert");
      setShownData(0);
      setLoading(false);
      reset({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setLoading(false);
      toast.error("Etwas ist schiefgelaufen. Überprüfe deine Eingaben");
    }
  };

  return (
    <>
      {shownData === 0 && (
        <div className="flex-[2]">
          <div>
            <div className="sm:0 flex flex-col gap-2 p-5">
              <div className="flex flex-col text-xl lg:flex-row">
                <p className="flex-[1] font-semibold">Dein Name:</p>
                <p className="flex-[2]">{`${data?.firstName} ${data?.lastName}`}</p>
              </div>
              <div className="flex flex-col text-xl lg:flex-row">
                <p className="flex-[1] font-semibold">Deine E-Mail:</p>
                <p className="flex-[2]">{data?.email.toLowerCase()}</p>
              </div>
              <div className="flex flex-col text-xl lg:flex-row">
                <p className="flex-[1] font-semibold">Deine Telefonnummer:</p>
                <p className="flex-[2]">{data?.phoneNumber}</p>
              </div>
              <div className="flex flex-col text-xl lg:flex-row">
                <p className="flex-[1] font-semibold">Passwort ändern:</p>
                <p
                  onClick={() => setShownData(1)}
                  className="flex-[2] cursor-pointer underline"
                >
                  Klicke Hier
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {shownData === 1 && (
        <div className="p-5 text-xl">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col gap-3">
              <label htmlFor="oldPassword">Altes Passwort:</label>
              <input
                {...register("oldPassword")}
                type="password"
                name="oldPassword"
                id="oldPassword"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password">Neues Passwort:</label>
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password">Neues Passwort Bestätigen:</label>
              <input
                {...register("confirmPassword")}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={` ${
                  errors?.confirmPassword ? "border-2 border-red-500" : ""
                } `}
              />
            </div>
            <p className="text-sm text-red-600">
              {errors?.confirmPassword && "Dein Password muss übereinstimmen"}
            </p>
            <button
              disabled={loading}
              className="rounded-md bg-slate-300 p-2 hover:bg-slate-200 disabled:text-gray-400 disabled:hover:bg-slate-300"
            >
              {loading ? "Bitte warten" : "Passwort ändern"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
