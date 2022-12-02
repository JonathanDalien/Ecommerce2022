import { Input } from "@mui/material";
import React from "react";

const Newsletter = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container m-auto py-16 px-4 md:px-0">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-slate-300 py-4 md:gap-10 md:py-16">
        <h1 className=" text-2xl font-semibold md:text-4xl lg:text-5xl">
          Abonniere unseren Newsletter
        </h1>
        <div>
          <form
            className="flex items-center rounded-lg border-2 bg-white p-2"
            action=""
            onSubmit={submitHandler}
          >
            <input
              type="email"
              placeholder="Gib deine Email ein"
              className="border-0 py-4  indent-4  focus:outline-none md:w-[500px] lg:w-[600px] "
            ></input>
            <button
              type="submit"
              className="rounded-md bg-gradient-to-r from-cyan-600 to-purple-400 p-3 px-6 font-semibold text-white transition-all hover:scale-105 hover:from-cyan-500 hover:to-purple-300"
            >
              Abonnieren
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
