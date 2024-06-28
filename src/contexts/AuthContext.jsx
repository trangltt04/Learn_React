import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          //Dùng cách này khi đã có api/endpoint để kiểm tra token
          // const { data } = await api.get("/me", {
          // headers: {
          // Authorization: `Bearer ${token},
          //},
          //});

          // Dùng cách này khi chưa có api/endpoint để kiểm tra token
          const {data} = await 
        } catch (error) {}
      }
    };
  });
  return <div></div>;
};

export default AuthContextProvider;
