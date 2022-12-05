import Link from "next/link";
import React from "react";
import OrderItem from "./OrderItem";

const ProfileInfo = ({ data }) => {
  return (
    <div className="flex-[2]">
      <div>
        <div className="sm:0 flex flex-col gap-2 p-5">
          <div className="flex flex-col text-xl lg:flex-row">
            <p className="flex-[1] font-semibold">Dein Name:</p>
            <p className="flex-[2]">{`${data.firstName} ${data.lastName}`}</p>
          </div>
          <div className="flex flex-col text-xl lg:flex-row">
            <p className="flex-[1] font-semibold">Deine E-Mail:</p>
            <p className="flex-[2]">{data?.email}</p>
          </div>
          <div className="flex flex-col text-xl lg:flex-row">
            <p className="flex-[1] font-semibold">Deine Telefonnummer:</p>
            <p className="flex-[2]">{data?.phoneNumber}</p>
          </div>
          <div className="flex flex-col text-xl lg:flex-row">
            <p className="flex-[1] font-semibold">Passwort ändern:</p>
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
