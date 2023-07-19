import { Route, Routes, Navigate } from "react-router-dom";
import { HomeBar, NavBar, SignIn, SignUp, Support } from "./components";
import { Booking, TakeRide } from "./container";
import Slider from "./container/about/Slider";
import RentBar from "./container/Rent/RentBar";
import HouseProfile from "./container/Rent/RentList/HousesProfiles/House1/HouseProfile";
import Driver from "./pages/Driver";
import ForgotPassword from "./pages/ForgotPassword";
import RentForm from "./pages/RentForm";
import toast, { Toaster } from "react-hot-toast";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Toaster />

      <div>
        <NavBar />
        <main>
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
