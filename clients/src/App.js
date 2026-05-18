import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { HomeBar, NavBar, SignIn, SignUp, Support } from "./components";
import { Booking, TakeRide } from "./container";
import Slider from "./container/about/Slider";
import RentBar from "./container/Rent/RentBar";
import HouseProfile from "./container/Rent/RentList/HousesProfiles/House1/HouseProfile";
import Driver from "./pages/Driver";
import ForgotPassword from "./pages/ForgotPassword";
import RentForm from "./pages/RentForm";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/shared/Overview";
import AllBookings from "./dashboard/booking/AllBookings";
import { Toaster } from "react-hot-toast";
import { Fragment } from "react";
import { useEffect } from "react";
import { setDataRent } from "./redux/rentSlice";
import { useDispatch } from "react-redux";
import { loginRedux } from "./redux/userSlice";
import { getCurrentUser, getRentsLocal } from "./utility/localDb";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/Admin");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/rent`);
        const resData = await res.json();
        dispatch(setDataRent(Array.isArray(resData) ? resData : []));
      } catch (error) {
        dispatch(setDataRent(getRentsLocal()));
      }
    })();

    const currentUser = getCurrentUser();
    if (currentUser) {
      dispatch(loginRedux({ data: currentUser }));
    }
  }, [dispatch]);
  return (
    <Fragment>
      <Toaster />

      <div className={isAdminPath ? "h-screen overflow-hidden" : ""}>
        {!isAdminPath && <NavBar />}
        <main className={isAdminPath ? "h-screen overflow-hidden" : ""}>
          <Routes>
            <Route path={"/"} element={<Navigate to={"/Home"} />} />

            <Route path={"/Home"} element={<HomeBar />} />

            <Route path={"/Ride"} element={<TakeRide />} />

            <Route path={"/Booking"} element={<Booking />} />

            <Route path={"/Rent"} element={<RentBar />} />

            <Route path={"/Help"} element={<Support />} />

            <Route path={"/About us"} element={<Slider />} />

            <Route path={"/Signin"} element={<SignIn />} />

            <Route path={"/SignUp"} element={<SignUp />} />

            <Route path={"/ForgotPassword"} element={<ForgotPassword />} />

            <Route path={"/RentForm"} element={<RentForm />} />

            <Route path={"/Driver"} element={<Driver />} />

            {/* Admin Dashboard Nested Routes */}
            <Route path={"/Admin"} element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="analytics" element={<div className="p-8">Analytics Page (Coming Soon)</div>} />
              <Route path="reports" element={<div className="p-8">Reports Page (Coming Soon)</div>} />
              <Route path="history" element={<div className="p-8">History Page (Coming Soon)</div>} />
              
              <Route path="booking/all" element={<AllBookings />} />
              <Route path="booking/reservations" element={<div className="p-8">Reservations (Coming Soon)</div>} />
              <Route path="booking/calendar" element={<div className="p-8">Booking Calendar (Coming Soon)</div>} />
              <Route path="booking/customers" element={<div className="p-8">Customers (Coming Soon)</div>} />
              <Route path="booking/refunds" element={<div className="p-8">Refund Requests (Coming Soon)</div>} />
              <Route path="booking/payments" element={<div className="p-8">Booking Payments (Coming Soon)</div>} />

              <Route path="renting/*" element={<div className="p-8">Renting Management (Coming Soon)</div>} />
              <Route path="travelling/*" element={<div className="p-8">Travelling Management (Coming Soon)</div>} />
              <Route path="communication/*" element={<div className="p-8">Communication (Coming Soon)</div>} />
              <Route path="system/*" element={<div className="p-8">System Settings (Coming Soon)</div>} />
            </Route>

            <Route path={"/HousesProfiles/House1"} element={<HouseProfile />} />

            {/* <Route path="/" exact>
            <Redirect to="/Home" />
          </Route>
          <Route path="/Home" exact>
            <HomeBar />
          </Route>

          <Route path="/Ride">
            <TakeRide />
          </Route>
          <Route path="/Booking">
            <Booking />
          </Route>
          <Route path="/Rent">
            <RentBar />
          </Route>
          <Route path="/Help">
            <Support />
          </Route>
          <Route path="/About us">
            <Slider />
          </Route>
          <Route path="/Signin">
            <SignIn />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/ForgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/RentForm">
            <RentForm />
          </Route>
          <Route path="/Driver">
            <Driver />
          </Route>
          <Route path="/HousesProfiles/House1">
            <HouseProfile />
          </Route> */}
          </Routes>
        </main>
      </div>
    </Fragment>
  );
}

export default App;
