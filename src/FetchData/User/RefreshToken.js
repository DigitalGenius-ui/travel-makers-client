import axios from "axios";
import Cookies from "js-cookie";

export const updateRefreshToken = async (accessToken) => {
  try {
    const res = await axios.post("/api/auth/refresh-token", accessToken);
    const refreshToken = Cookies.get("refreshToken");
    const { accessToken, refreshToken: newRefreshToken } =
      await updateRefreshToken(refreshToken);

    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", newRefreshToken);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
