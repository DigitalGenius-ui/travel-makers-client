import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ErrorApi from "../utils/ErrorApi";
import { axiosInstance } from "../FetchData/axiosInstance";

const UserAuth = createContext();

const UserContext = ({ children }) => {
  const [userExist] = useState(JSON.parse(localStorage.getItem("user")));

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      if (token && user?.id) {
        const res = await axiosInstance.get(`/api/user/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
      return false;
    },
  });

  const userData = data?.user;

  let firstRender;
  useEffect(() => {
    firstRender = true;
    const getRefreshToken = async () => {
      try {
        if (firstRender && userExist) {
          const getToken = await axios.get("/api/auth/refreshToken");
          setToken(getToken.data.accessToken);
          const decodeData = jwtDecode(getToken.data.accessToken);
          if (decodeData) {
            setUser(decodeData);
          }
        }
        firstRender = false;
      } catch (error) {
        setErrorText("Something went wrong" + error);
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };
    getRefreshToken();
  }, [userExist]);

  axiosInstance.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (userExist && user?.exp * 1000 < currentDate.getTime()) {
        const res = await axios.get("/api/auth/refreshToken");
        config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        setToken(res.data.accessToken);

        const decodeData = jwtDecode(res.data.accessToken);
        if (decodeData) {
          setUser(decodeData);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <UserAuth.Provider value={{ currentUser: userData, isPending }}>
      {loading ? <Loading /> : children}
    </UserAuth.Provider>
  );
};

export default UserContext;

export const useCurrentUser = () => useContext(UserAuth);
