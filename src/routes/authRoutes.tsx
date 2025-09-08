import { Navigate, Route } from "react-router-dom";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ResetPassword from "../components/Auth/ResetPassword";
import Login from "../components/Auth/Login";
import type { userType } from "../types/user-type";

export const authRoutes = (currentUser: userType) => [
  <Route
    key="login"
    path="/auth/login"
    element={currentUser ? <Navigate to="/" replace /> : <Login />}
  />,
  <Route
    key="register"
    path="/auth/register"
    element={currentUser ? <Navigate to="/" replace /> : <Register />}
  />,
  <Route
    key="password"
    path="/auth/fotgot/password"
    element={currentUser ? <Navigate to="/" replace /> : <ForgotPassword />}
  />,
  <Route
    key="reset"
    path="/auth/password/reset"
    element={currentUser ? <Navigate to="/" replace /> : <ResetPassword />}
  />,
];
