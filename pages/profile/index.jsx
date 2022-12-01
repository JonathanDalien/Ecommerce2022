import React, { useEffect, useState } from "react";
import OrderItem from "../../components/OrderItem";
import { useStateContext } from "../../context/StateContext";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import Orders from "../../components/Orders";
import ProfileInfo from "../../components/ProfileInfo";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { protectedProfile, withProtectedPublic } from "../../route";

const Profile = ({ dataArray, userLogged }) => {
  const router = useRouter();
  const [currentSetting, setCurrentSetting] = useState(0);
  const { setUser, setPageLoading, user } = useStateContext();
  const [orderDataArray, setOrderDataArray] = useState();
  const [userDataArray, setUserDataArray] = useState([]);

  const [userData] = userDataArray;

  console.log(userData);

  useEffect(() => {
    const queryfunc = async () => {
      const userRef = collection(db, "users");
      const q2 = query(userRef, where("uid", "==", user.uid));
      const userSnapshot = await getDocs(q2);
      setUserDataArray(userSnapshot.docs.map((doc) => ({ ...doc.data() })));
    };

    queryfunc();

    if (userDataArray) setPageLoading(false);
  }, []);

  useEffect(() => {
    const queryfunc = async () => {
      const orderRef = collection(db, "orders");
      const q = query(orderRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setOrderDataArray(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    };

    queryfunc();
  }, []);

  const handleSignOut = async () => {
    router.push("/");
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="h-[calc(100vh-84px)] bg-slate-200">
      <div className="container m-auto p-24">
        <div className="py-2 text-3xl">Dein Profil</div>
        <div className="my-3 h-1 w-[100%] bg-gray-400"></div>
        <div className="flex">
          <div className="flex flex-[0.5] justify-start">
            <div className="flex flex-col gap-2 text-xl">
              <p
                onClick={() => setCurrentSetting(0)}
                className={`${
                  currentSetting === 0 ? "bg-slate-300" : "hover:bg-slate-100"
                } cursor-pointer rounded-md p-2 `}
              >
                Deine Bestellungen
              </p>
              <p
                onClick={() => setCurrentSetting(1)}
                className={`${
                  currentSetting === 1 ? "bg-slate-300" : "hover:bg-slate-100"
                } cursor-pointer rounded-md p-2`}
              >
                Account Informationen ändern
              </p>
              <p
                onClick={handleSignOut}
                className={`${
                  currentSetting === 2 ? "bg-slate-300" : "hover:bg-slate-100"
                } cursor-pointer rounded-md p-2`}
              >
                Abmelden
              </p>
            </div>
            <div className=" mx-5 w-1 bg-gray-400"></div>
          </div>
          {currentSetting === 0 && <Orders data={orderDataArray} />}
          {currentSetting === 1 && <ProfileInfo data={userData} />}
        </div>
      </div>
    </div>
  );
};

export default protectedProfile(Profile);
