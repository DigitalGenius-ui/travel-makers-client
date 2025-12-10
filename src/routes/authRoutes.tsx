import { Navigate, Route } from "react-router-dom";
import type { userType } from "../types/user-type";
import { lazy } from "react";

const Register = lazy(() => import("../components/Auth/Register"));
const ForgotPassword = lazy(() => import("../components/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../components/Auth/ResetPassword"));
const Login = lazy(() => import("../components/Auth/Login"));

export const authRoutes = (currentUser: userType | undefined) => [
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
