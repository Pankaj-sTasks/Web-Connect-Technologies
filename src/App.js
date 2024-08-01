import "./App.css";
import {  Routes, Route, useNavigate } from "react-router-dom";
import { useEffect} from "react";
import Home from "./Pages/Home/Home";
import { TailSpin } from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Component/Header/Header";


import { jwtDecode } from 'jwt-decode';

import { isLogin } from "./redux/common";
import UserPosts from "./Pages/UserPosts/Post";
import Profile from "./Pages/Profile/Profile";


function App() {
 
  const loaderStatus = useSelector((state) => state.apiReducer.loader);
  const isLoginStatus = useSelector((state) => state.apiReducer.isLogin);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  setInterval(() => {
    AuthVerifyComponent();
  }, 1000);
  const AuthVerifyComponent = () => {
    if (localStorage.getItem("oAuth")) {
      const jwt_Token_decoded = jwtDecode(localStorage.getItem("oAuth"));
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        // console.log("comming")
        localStorage.clear();
        navigate("/");
        dispatch(isLogin(false));
        toast.error("Session expired.Please login to proceed");
      }
    }

    return <div></div>;
  };

  useEffect(() => {
   

    if (
      localStorage.getItem("isLogin") == null ||
      localStorage.getItem("isLogin") == false
    ) {
      dispatch(isLogin(false));
    } else {
      dispatch(isLogin(true));
    }

  }, [isLoginStatus]);

  return (
    <>
      <TailSpin
        height="100"
        width="80"
        color="#107B38"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="tailSpin"
        visible={loaderStatus}
      />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all_post_of_user/:userId" element={<UserPosts />} />
        <Route path="/profile/:userId" element={<Profile />} />
        
      </Routes>

      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
}

export default App;
