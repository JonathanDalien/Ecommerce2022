import { issuedAtTime } from "@firebase/util";
import { duration } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineContactSupport } from "react-icons/md";

const Support = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSend, setIsSend] = useState(false);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName == "" ||
      formData.lastName == "" ||
      formData.email == "" ||
      formData.message == ""
    ) {
      toast.error("Bitte fülle alle Felder aus");
    } else {
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setIsSend(true);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-86px)] flex-col items-center justify-start gap-5 bg-slate-100 p-6 md:justify-center md:gap-10 md:p-20">
      <h1 className="text-center text-2xl font-semibold uppercase sm:text-4xl md:text-5xl">
        Du hast Fragen an uns?
      </h1>
      <div className="container md:m-auto ">
        <div className="flex items-center justify-center md:justify-around">
          <MdOutlineContactSupport
            color="darkblue"
            className="hidden text-[30rem] lg:block"
          />
          <div>
            {!isSend ? (
              <form className="flex flex-col gap-6" action="">
                <input
                  className=" rounded-lg border-2 border-gray-200 px-4 py-2"
                  type="text"
                  placeholder="Dein Vorname"
                  name="firstName"
                  onChange={handleForm}
                  value={formData.firstName}
                  id="firstName"
                />
                <input
                  className="rounded-lg border-2 border-gray-200 px-4 py-2 text-lg"
                  type="text"
                  placeholder="Dein Name"
                  name="lastName"
                  onChange={handleForm}
                  value={formData.lastName}
                  id="lastName"
                />
                <input
                  className="rounded-lg border-2 border-gray-200 px-4 py-2 text-lg"
                  type="text"
                  placeholder="Deine Email"
                  name="email"
                  onChange={handleForm}
                  value={formData.email}
                  id="email"
                />
                <textarea
                  className="h-[10em] w-[20em] rounded-lg border-2 border-gray-200 px-4 py-2 text-lg md:w-[30em]"
                  name="message"
                  onChange={handleForm}
                  value={formData.message}
                  id="message"
                  placeholder="Deine Nachricht..."
                ></textarea>
                <button
                  onClick={handleSubmit}
                  disabled={isSend}
                  className=" rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-4 px-2 font-semibold text-white transition-all hover:scale-105 hover:from-cyan-500 hover:to-purple-300  md:px-6 xl:text-2xl"
                >
                  Abschicken
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-between gap-5">
                <h1 className="text-center text-xl ">
                  Vielen Dank! <br /> Wir kümmern uns schnellstmöglich um dein
                  Anliegen.
                </h1>
                <div>
                  <Link className="text-blue-800" href="/">
                    Zur Startseite zurückkehren
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
