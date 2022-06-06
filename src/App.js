import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbaar from "./components/Navbaar/Navbaar";
import Login from "./pages/unprotected/Login/Login";
import Signup from "./pages/unprotected/Signup/Signup";
import ProtectedRoutes from "./addons/routes/ProtectedRoutes";
import Home from "./pages/protected/Home/Home";
import { useEffect } from "react";
import Otpverification from "./pages/unprotected/OtpVerification/Otpverification";
import { useReloading } from "./addons/hooks/useReloading";
import Forgotpassword from "./pages/unprotected/ForgetPassword/ForgetPassword";
import SelectBirthDay from "./pages/semiprotected/SelectBirthDay";
import Profile from "./pages/protected/Profile/Profile";

function App() {
  // eslint-disable-next-line
  // importing navgiation handling and protecting states
  const { user } = useSelector(s => s.user);
  const { isAuth, pageTitle } = useSelector(s => s.operater);
  useEffect(() => {
    // setting head title
    document.title = `Sociogram - ${pageTitle}`;
    console.log("running page");
  }, [pageTitle])

  // initializing protected routes
  const Unprotected = ProtectedRoutes.Guest;
  const Protected = ProtectedRoutes.Protected;
  const SemiProtected = ProtectedRoutes.SemiProtected;

  // importing custom hook for keep user logged in until user logout
  const loading = useReloading();
  return (
    loading?"Loading..."
    :
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        {/* show navbaar if user logged in and also activated */}
        {user.activated && isAuth && <Navbaar />}
        <Routes>

          {/* Login Page */}
          <Route path="/" exact element={<Unprotected isAuth={isAuth}>
            <Login />
          </Unprotected>} />

          {/* Signup Page */}
          <Route path="/signup" exact element={<Unprotected isAuth={isAuth}>
            <Signup />
          </Unprotected>} />

          {/* Forgot Password Page */}
          <Route path="/forgotpassword" exact element={<Unprotected isAuth={isAuth}>
            <Forgotpassword />
          </Unprotected>} />

          {/* Otp Verification Page */}
          <Route path="/otp_verification" exact element={<Unprotected isAuth={isAuth}>
            <Otpverification />
          </Unprotected>} />

          {/* Select Birthday Page */}
          <Route path="/activate" exact element={<SemiProtected isAuth={isAuth} user={user}>
            <SelectBirthDay/>
          </SemiProtected>} />

          {/* Home Page */}
          <Route path="/home" exact element={<Protected isAuth={isAuth} user={user}>
            <Home />
          </Protected>} />

          {/* Profile Page */}
          <Route path="/profile" exact element={<Protected isAuth={isAuth} user={user}>
            <Profile />
          </Protected>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
