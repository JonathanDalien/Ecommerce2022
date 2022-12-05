import { useRouter } from "next/router";
import React from "react";
import dateFormat, { mask, i18n } from "dateformat";

i18n.dayNames = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

i18n.monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const OrderItem = ({ orderInfo }) => {
  const date = new Date(orderInfo.create_time);
  const formattedDate = dateFormat(date, "dddd, dd. mmmm yyyy");

  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/orders/${orderInfo.orderId}`)}
      className="my-4 w-[100%] cursor-pointer rounded-md bg-slate-200 p-2 transition-all hover:bg-slate-100"
    >
      <p>Bestellnummer #{orderInfo?.orderId}</p>
      <p>Bestellt am: {formattedDate}</p>
      <p>Betrag: {orderInfo?.totalPrice.toFixed(2)} €</p>
    </div>
  );
};

export default OrderItem;
