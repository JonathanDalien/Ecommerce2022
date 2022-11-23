import { Input } from "@mui/material";
import React from "react";

const Newsletter = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container m-auto py-16">
      <div className="flex flex-col items-center justify-start gap-10 rounded-xl bg-slate-300 py-16">
        <h1 className="  text-5xl font-semibold">
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
              className="w-[600px] border-0  py-4 indent-4 focus:outline-none "
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
