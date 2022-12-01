import React, { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user, setPageLoading } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [router, user]);

  return <>{!user ? children : () => setPageLoading(true)}</>;
};

export default ProtectedRoute;
