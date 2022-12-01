import React from "react";
import OrderItem from "./OrderItem";

const Orders = ({ data }) => {
  return (
    <div className="h-[55vh] flex-[2] overflow-auto">
      <div>
        <p className="p-2 text-2xl">Deine Bestellungen</p>
        {data ? (
          <div>
            {data?.map((item) => {
              return <OrderItem orderInfo={item} />;
            })}
          </div>
        ) : (
          <p>Du hast bisher keine Bestellung getätigt</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
