import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Home/Header/Header";
import Footer from "./components/Home/Footer/Footer";
import Loading from "./Loading";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AllTours from "./components/Home/RecommendedTours/AllTours";
import FilterTours from "./components/Home/Destinations/FilterTours";
import TourDetails from "./components/Pages/tours/TourDetails/TourDetails";
import BookTicket from "./components/Pages/tours/TourDetails/Tickets/BookTicket/BookTicket";
import ProfileMenu from "./components/Pages/profile/ProfileMenu";
import CreatePost from "./components/Pages/profile/myPosts/Posts/CreatePost/CreatePost";
import SinglePost from "./components/Pages/profile/myPosts/Posts/SinglePost/SinglePost";
import CreateReview from "./components/Pages/tours/TourDetails/TourDetails/write/CreateReview";
import SingleProfile from "./components/Pages/singleProfile/SingleProfile";
import CheckOut from "./components/Pages/tours/CheckOut/CheckOut";
import { useCurrentUser } from "./Context/UserContext";

const App = () => {
  const { currentUser, isPending } = useCurrentUser();

  if (isPending) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<RouteWrapper />}>
        <Route path="/" element={<Home />} />
        {!currentUser && <Route path="/auth/login" element={<Login />} />}
        {!currentUser && <Route path="/auth/register" element={<Register />} />}
        <Route path="/tour/filtered/:tourCat" element={<FilterTours />} />
        <Route path="/allTours" element={<AllTours />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/tour/Book/:tourId" element={<BookTicket />} />
        {currentUser && (
          <Route path="/tour/write/:id" element={<CreateReview />} />
        )}
        {currentUser && (
          <Route path="/checkout/success" element={<CheckOut />} />
        )}
        {/* public profile  */}
        <Route path="/singleProfile/:id" element={<SingleProfile />} />
        {/* protected profile  */}
        {currentUser && <Route path="/profile/*" element={<ProfileMenu />} />}
        {currentUser && (
          <Route path="/profile/posts/createPost" element={<CreatePost />} />
        )}
        <Route path="/profile/posts/post/:id" element={<SinglePost />} />
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
