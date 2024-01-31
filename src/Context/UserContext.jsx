import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ErrorApi from "../utils/ErrorApi";

const UserAuth = createContext();
const axiosInstance = axios.create();

const UserContext = ({ children }) => {
  const [userExist] = useState(JSON.parse(localStorage.getItem("user")));

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      if (token && user?.id) {
        const res = await axiosInstance.get(`/api/user/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } else {
        return {};
      }
    },
    enabled: !!userExist ? !!user && !!token : undefined,
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
        throw new Error(error);
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
    <UserAuth.Provider value={{ currentUser: userData }}>
      {isPending ? (
        <Loading />
      ) : isError ? (
        <ErrorApi errorText={error} />
      ) : (
        children
      )}
    </UserAuth.Provider>
  );
};

export default UserContext;

export const useCurrentUser = () => useContext(UserAuth);
