import { Route } from "react-router-dom";
import { lazy } from "react";

const CreateReview = lazy(
  () =>
    import(
      "../components/Pages/tours/TourDetails/TourDetails/write/CreateReview"
    )
);
const CheckOut = lazy(
  () => import("../components/Pages/tours/CheckOut/CheckOut")
);
const MyBookings = lazy(
  () => import("../components/Pages/profile/myBookings/MyBookings")
);
const MyPosts = lazy(
  () => import("../components/Pages/profile/myPosts/MyPosts")
);
const ChangePassword = lazy(
  () => import("../components/Pages/profile/managePassword/ChangePassword")
);
const LinkedAccounts = lazy(
  () => import("../components/Pages/profile/linkAccount/LinkAccounts")
);
const CreatePost = lazy(
  () =>
    import("../components/Pages/profile/myPosts/Posts/CreatePost/CreatePost")
);
const DashboardLayout = lazy(
  () => import("../pages/Dashboard/Layout/DashboardLayout")
);
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Packages = lazy(() => import("../pages/Dashboard/Packages"));
const Bookings = lazy(() => import("../pages/Dashboard/Bookings"));
const Travlers = lazy(() => import("../pages/Dashboard/Travlers"));
const Guides = lazy(() => import("../pages/Dashboard/Guides"));
const Gallery = lazy(() => import("../pages/Dashboard/Gallery"));
const Messages = lazy(() => import("../pages/Dashboard/Messages"));
const FeedBacks = lazy(() => import("../pages/Dashboard/FeedBacks"));
const ProfileMenu = lazy(() => import("../pages/Profile/ProfileMenu"));
const MyProfile = lazy(
  () => import("../components/Pages/profile/myProfile/MyProfile")
);

export const protectedRoutes = (isAdmin: boolean) => {
  return [
    <Route key="dashboard" path="/" element={<DashboardLayout />}>
      {isAdmin && (
        <>
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="packages/:id" element={<Packages />} />
          <Route path="bookings/:id" element={<Bookings />} />
          <Route path="travlers/:id" element={<Travlers />} />
          <Route path="guides/:id" element={<Guides />} />
          <Route path="gallery/:id" element={<Gallery />} />
          <Route path="messages/:id" element={<Messages />} />
          <Route path="feedbacks/:id" element={<FeedBacks />} />
        </>
      )}
    </Route>,
    <Route key="write" path="/tour/write/:id" element={<CreateReview />} />,
    <Route key="checkout" path="/checkout/success" element={<CheckOut />} />,
    <Route key="profile" path="/profile/" element={<ProfileMenu />}>
      <Route path="profileDetails/:id" element={<MyProfile />} />
      <Route path="booking/:id" element={<MyBookings />} />,
      <Route path="posts/:id" element={<MyPosts />} />,
      <Route path="password/:id" element={<ChangePassword />} />,
      <Route path="accounts/:id" element={<LinkedAccounts />} />,
    </Route>,
    <Route
      key={"createPost"}
      path="/profile/posts/createPost"
      element={<CreatePost />}
    />,
  ];
};
