import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { urlFor } from "../../lib/client";
import { db } from "../../lib/firebase";

const OrderDetails = ({ data }) => {
  console.log(data);

  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    switch (data.statusCode) {
      case 0:
        setOrderStatus({
          desc: `Wir haben deine Bestellung erhalten, und diese befindet sich nun in Bearbeitung. Eine Bestätigungsemail wurde gesendet an  ${data.email}. Auf dieser Seite siehst du alle weiteren Updates was deine Bestellung angeht.`,
          status: "Wir haben deine Bestellung erhalten",
          color: "grey",
        });
        break;
      case 1:
        setOrderStatus({
          desc: "Deine Bestellung wird nun vorbereitet und verpackt. Eine Sendungsnummer wird dir innerhalb der nächsten 24 Stunden an deine E-Mail gesendet. Auf dieser Seite siehst du alle weiteren Updates was deine Bestellung angeht.",
          status: "Deine Bestellung wird nun vorbereitet",
          color: "blue",
        });
        break;
      case 2:
        setOrderStatus({
          desc: "Deine Bestellung wurde versendet und befindet sich nun in Zustellung. In der Regel dauert der Versand 2-3 Werktage. Eine Versandbestätigung wurde dir an deine E-Mail geschickt. Auf dieser Seite siehst du alle weitern Updates was deine Bestellung angeht.",
          status: "Deine Bestellung befindet sich in Zustellung",
          color: "green",
        });
        break;
      case 3:
        setOrderStatus({
          desc: "Deine Bestellung wurde zugestellt! Electronics. bedankt sich herzlichst bei dir und freut sich auf deine nächste Bestellung. Bei Fragen oder Probleme schreib uns an email@support.de und wir kümmern uns schnellstmöglich um dein Anliegen.",
          status: "Du hast deine Bestellung erhalten",
          color: "green",
        });
    }
  }, []);

  return (
    <div className="h-[calc(100vh-84px)] bg-slate-100">
      <div className="container m-auto flex gap-10 p-20">
        <div className="left flex flex-[1] flex-col gap-4">
          <h1 className=" my-4 text-3xl font-bold">Electronics.</h1>
          <div className="flex items-center gap-2">
            <AiOutlineCheckCircle
              className={`text-6xl text-${orderStatus.color}-500`}
            />
            <div>
              <p className="">Bestellung #{data.orderId}</p>
              <h1 className="text-2xl font-semibold">
                Dankeschön {data.firstName}!
              </h1>
            </div>
          </div>
          <div className="confirmation_container rounded-md border-2 border-gray-300 p-4">
            <h1 className="pb-2 text-2xl font-semibold">
              {orderStatus.status}
            </h1>
            <p>{orderStatus.desc}</p>
          </div>
          <div className="rounded-md border-2 border-gray-200 p-4">
            <h1 className="pb-4 text-2xl font-semibold">Kundeninformation</h1>
            <div className="grid grid-cols-2 grid-rows-2 gap-8">
              <div>
                <h2 className="pb-2 text-lg font-semibold">Lieferadresse</h2>
                <p>{`${data.firstName} ${data.lastName}`}</p>
                <p>{`${data.address.address_line_1} ${data.address.address_line_2}`}</p>
                <p>{`${data.address.postal_code} ${data.address.admin_area_1}`}</p>
                <p>{data.email}</p>
              </div>
              <div>
                <h2 className="pb-2 text-lg font-semibold">Rechnungsadresse</h2>
                <p>{`${data.firstName} ${data.lastName}`}</p>
                <p>{`${data.address.address_line_1} ${data.address.address_line_2}`}</p>
                <p>{`${data.address.postal_code} ${data.address.admin_area_1}`}</p>
                <p>{data.email}</p>
              </div>
              <div>
                <h2 className="pb-2 text-lg font-semibold">Versandart</h2>
                <p>Kostenloser Standardversand</p>
              </div>
              <div>
                <h2 className="pb-2 text-lg font-semibold">Bezahlmethode</h2>
                <p>Paypal</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right flex flex-[1] flex-col rounded-md border-2 border-gray-300 p-10">
          <div className="flex h-[50vh] flex-col gap-5 overflow-auto">
            {data.items.map((item, i) => {
              return (
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-4 ">
                    <img
                      className="h-[100px] w-[100px] rounded-md border-[1px] border-gray-400 object-contain mix-blend-multiply"
                      src={urlFor(
                        item.colorImages.filter(
                          (colorItem) => colorItem.color === item.chosenColor
                        )[0].allImage[0]
                      )}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold">{item.name}</h1>
                      <p className="text-gray-400">{item.chosenColor}</p>
                      <p className="text-gray-400">Anzahl: {item.quantity}</p>
                    </div>
                  </div>
                  <div>
                    <p>{item.price.toFixed(2)} €</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-4 h-[2px] w-[100%] bg-slate-600"></div>
          <div className="flex justify-between">
            <p className="font-bold text-gray-600">Zwischensumme:</p>
            <p>{data.totalPrice.toFixed(2)} €</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-gray-600">Versand:</p>
            <p>0 €</p>
          </div>
          <div className="my-4 h-[2px] w-[100%] bg-slate-600"></div>
          <div className="flex justify-between">
            <p className="text-lg font-bold ">Gesamtbetrag:</p>
            <p className="text-2xl">{data.totalPrice.toFixed(2)} €</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { orderId } = params;

  const orderRef = collection(db, "orders");
  const q = query(orderRef, where("orderId", "==", orderId));
  const querySnapshot = await getDocs(q);
  const dataArray = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  const [data] = dataArray;

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
};
