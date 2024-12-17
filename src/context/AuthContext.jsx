import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { USERS_URLS } from "../constants/END_POINTS.js";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getcurrentUser = async () => {
    try {
      const res = await axios.get(USERS_URLS.currentUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCurrentUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
      getcurrentUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData, currentUser, getcurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
