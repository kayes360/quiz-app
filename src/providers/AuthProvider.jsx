import React, { useEffect, useState } from "react";
import { AuthContext } from "../context";

export default function AuthProvider({ children }) {
//   const localAuth =  localStorage.getItem("auth");
//   const [auth, setAuth] = useState(localAuth ? JSON.parse(localAuth) : {});

//   useEffect(() => {
//     if (Object.keys(auth).length > 0) {
//       localStorage.setItem("auth", JSON.stringify(auth));
//     } else {
//       localStorage.removeItem("auth");
//     }
//   }, [auth]);

  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
