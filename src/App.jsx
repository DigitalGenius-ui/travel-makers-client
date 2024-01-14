import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Home/Header/Header";
import Footer from "./components/Home/Footer/Footer";
import Loading from "./Loading";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import useCurrentUser from "./Hooks/useCurrentUser";

const App = () => {
  const currentUser = useCurrentUser();
  console.log(currentUser);

  return (
    <Routes>
      <h2>test</h2>
      <Route path="/" element={<RouteWrapper />}>
        <Route path="/" element={<Home />} />
        {!currentUser && <Route path="/auth/login" element={<Login />} />}
        {!currentUser && <Route path="/auth/register" element={<Register />} />}
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/" : "/auth/login"} />}
        />
      </Route>
    </Routes>
  );
};

export default App;

const RouteWrapper = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Outlet />
      <Footer />
    </Suspense>
  );
};
