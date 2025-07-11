import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import Footer from "./components/Home/Footer/Footer";
import Loading from "./Loading";
import { useCurrentUser } from "./Context/UserContext";
import NotFound from "./not-found";
import { publicToutes } from "./routes/PublicToutes";
import { protectedRoutes } from "./routes/ProtectedRoutes";
import { authRoutes } from "./routes/AuthRoutes";

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
