import React from "react";
import { client } from "../lib/client";
import { useStateContext } from "../context/StateContext";

function Mutate() {
  const { cartItems } = useStateContext();

  async function mutate(mutations) {
    const result = await fetch(
      `https://mf5rnynb.api.sanity.io/v2022-11-13/data/mutate/production`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_SANITY_TOKEN}`,
        },
        body: JSON.stringify(mutations),
        method: "POST",
      }
    );

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

  return (
    <div className="h-screen">
      <button
        onClick={() => mutate(mutations)}
        className="button m-6 bg-slate-400 py-2 px-3"
      >
        Decrease Quantity of Product
      </button>
      <button
        onClick={() => console.log(patch)}
        className="button m-6 bg-slate-400 py-2 px-3"
      >
        Patch
      </button>
      <button
        onClick={() => console.log(cartItems)}
        className="button m-6 bg-slate-400 py-2 px-3"
      >
        CartItems
      </button>
      <button
        onClick={() => console.log("Bearer " + process.env.NEXT_SANITY_TOKEN)}
        className="button m-6 bg-slate-400 py-2 px-3"
      >
        CartItems
      </button>
    </div>
  );
}

export default Mutate;
