import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useCurrentUser } from "./context/UserContext";
import NotFound from "./not-found";
import { authRoutes } from "./routes/authRoutes";
import { publicToutes } from "./routes/publicToutes";
import { protectedRoutes } from "./routes/protectedRoutes";

const Header = lazy(() => import("./components/Home/Header/Header"));
const Footer = lazy(() => import("./components/Home/Footer"));
const Loading = lazy(() => import("./Loading"));

const App = () => {
  const { currentUser, isPending } = useCurrentUser();

  if (isPending) {
    return <Loading />;
  }

  const isAdmin = currentUser?.role === "ADMIN";
  return (
    <Routes>
      <Route path="/" element={<RouteWrapper />}>
        {publicToutes}
        {currentUser && protectedRoutes(isAdmin)}
        {authRoutes(currentUser)}
        <Route path="*" element={<NotFound />} />
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
