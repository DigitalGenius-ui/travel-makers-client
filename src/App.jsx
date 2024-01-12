import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Home/Header/Header";
import Footer from "./components/Home/Footer/Footer";
import Loading from "./Loading";

const App = () => {
  return (
    <Routes>
      <h2>test</h2>
      <Route path="/" element={<RouteWrapper />}>
        <Route path="/" element={<Home />} />
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
