import Link from "next/link";
import React from "react";
import OrderItem from "./OrderItem";

const ProfileInfo = ({ data }) => {
  return (
    <div className="flex-[2]">
      <div>
        <p className="p-2 pb-8 text-2xl">Dein Account</p>
        <div className="flex flex-col gap-2">
          <div className="flex text-xl">
            <p className="flex-[1]">Dein Name:</p>
            <p className="flex-[2]">{data?.name}</p>
          </div>
          <div className="flex text-xl">
            <p className="flex-[1]">Deine E-Mail:</p>
            <p className="flex-[2]">{data?.email}</p>
          </div>
          <div className="flex text-xl">
            <p className="flex-[1]">Deine Telefonnummer:</p>
            <p className="flex-[2]">{data?.phoneNumber}</p>
          </div>
          <div className="flex text-xl">
            <p className="flex-[1]">Passwort ändern:</p>
            <Link href="/changePassword" className="flex-[2] underline">
              Klicke Hier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
