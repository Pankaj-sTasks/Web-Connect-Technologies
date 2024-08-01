import React, { useEffect, useState } from "react";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import { GiOpenBook, GiTrophyCup } from "react-icons/gi";
import { SlBadge } from "react-icons/sl";
import jwt_decode from "jwt-decode";
import { RiComputerLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { isLogin, loader } from "../../redux/common";
import { toast } from "react-toastify";
import {
  userDashboard,
  userDashboardInfo,
  userPersonalDetail,
} from "../../redux/profile";
import { CircularProgressbar } from "react-circular-progressbar";

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let [refresher, setRefresher] = useState(true);
  const [profileStatus, setProfileStatus] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [personalData, setPersonalData] = useState([]);
  useEffect(() => {
    dispatch(loader(true));

    dispatch(
      userDashboard((resp) => {
        if (resp.status) {
          setProfileStatus(resp.data);
          dispatch(loader(false));
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
    dispatch(
      userDashboardInfo((resp) => {
        if (resp.status) {
          setProfileInfo(resp.data);
          dispatch(loader(false));
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
    dispatch(
      userPersonalDetail((resp) => {
        if (resp.status) {
          setPersonalData(resp.data)
          dispatch(loader(false));
        } else {
          dispatch(loader(false));
          toast.error(resp.message);
        }
      })
    );
  }, []);
  setInterval(() => {
    autoLogOut();
  }, 1000);

  const autoLogOut = () => {
    if (localStorage.getItem("oAuth")) {
      const jwt_Token_decoded = jwt_decode(localStorage.getItem("oAuth"));
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("oAuth");
        localStorage.clear();
        navigate("/");
        dispatch(isLogin(false));
        toast.error("Session expired.Please login to proceed");
      }
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("oAuth");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("UserCreatedDate");
    localStorage.removeItem("collegeId");
    navigate("/");
    dispatch(isLogin(false));
    toast.success("You have logged out successfully");
  };

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Get the current URL path
    const currentPath = window.location.pathname;
    setActiveTab(currentPath);
  }, []);

  return (
    <div className="ProFILE">
      <div className="PageHEaders">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PageTi pt-5">
                <h2>Profile</h2>
                <p>
                  <Link to="/">Home</Link>{" "}
                  <i>
                    <FaAngleRight />
                  </i>
                  <Link to="/profile">Profile</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ProfileTabs pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              {!personalData.isExUser && personalData.isEnrolledInDirectTraining ?
                <div className="SIdeBar">
                  <Nav defaultActiveKey="/dashboard" className="flex-column">
                    <Nav.Link
                      className={activeTab === "/profile" ? "Active_tab" : ""} as={Link}
                    >
                      <Link to="/profile">My Profile</Link>
                    </Nav.Link>
                    <Nav.Link
                      className={activeTab === "/wishlist" ? "Active_tab" : ""}
                    >
                      <Link to="/wishlist">Wishlist</Link>
                    </Nav.Link>
                    {personalData.isEnrolledInDirectTraining
                      &&
                      <Nav.Link
                        className={
                          activeTab === "/training_history" ? "Active_tab" : ""
                        }
                      >
                        <Link to="/training_history">Direct Training Orders</Link>{" "}
                      </Nav.Link>}
                    <Nav.Link className={activeTab === "/" ? "Active_tab" : ""}>
                      {" "}
                      <Link to="/" onClick={handleLogOut}>
                        Log Out
                      </Link>
                    </Nav.Link>
                  </Nav>
                </div> :
                <div className="SIdeBar">
                  <Nav defaultActiveKey="/dashboard" className="flex-column">
                    <Nav.Link
                      className={activeTab === "/dashboard" ? "Active_tab" : ""}
                    >
                      {" "}
                      <Link to="/dashboard">Dashboard</Link>{" "}
                    </Nav.Link>
                    <Nav.Link
                      className={activeTab === "/subscribe" ? "Active_tab" : ""}
                    >
                      <Link to="/subscribe">My Subscription</Link>
                    </Nav.Link>
                    <Nav.Link
                      className={activeTab === "/mycourse" ? "Active_tab" : ""}
                    >
                      {" "}
                      <Link to="/mycourse">My Course</Link>
                    </Nav.Link>
                    <Nav.Link
                      className={
                        activeTab === "/orderhistory" ? "Active_tab" : ""
                      }
                    >
                      <Link to="/orderhistory">Order History</Link>{" "}
                    </Nav.Link>
                    {personalData.isEnrolledInDirectTraining
                      &&
                      <Nav.Link
                        className={
                          activeTab === "/training_history" ? "Active_tab" : ""
                        }
                      >
                        <Link to="/training_history">Direct Training Orders</Link>{" "}
                      </Nav.Link>}
                    <Nav.Link
                      className={activeTab === "/wishlist" ? "Active_tab" : ""}
                    >
                      <Link to="/wishlist">Wishlist</Link>
                    </Nav.Link>
                    <Nav.Link
                      className={activeTab === "/profile" ? "Active_tab" : ""}
                    >
                      {" "}
                      <Link style={{ width: "100%" }} to="/profile">My Profile</Link>
                    </Nav.Link>
                    <Nav.Link className={activeTab === "/" ? "Active_tab" : ""}>
                      {" "}
                      <Link to="/" onClick={handleLogOut}>
                        Log Out
                      </Link>
                    </Nav.Link>
                  </Nav>
                </div>
              }
            </div>
            
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="Direct d-flex justify-content-between">
                  <div className="GrnBGTemp">
                    <h5>Complete your profile</h5>
                    <p>
                     Welcome to your profile! Take a moment to complete your profile, and let us help you embark on a journey of growth and success. By providing information about your professional background, interests, and areas of expertise, we can suggest courses and services that align closely with your needs.{" "}
                    </p>
                  </div>

                  <div className="circular-progress-container">
                    {profileStatus !== null ? (
                      <CircularProgressbar
                        value={profileStatus}
                        text={`${profileStatus}%`}
                        styles={{
                          path: {
                            stroke: `#107b38`,
                            strokeLinecap: "butt",
                            transition: "stroke-dashoffset 0.5s ease 0s",
                          },
                          trail: {
                            stroke: "#fff",
                          },
                          text: {
                            fontSize: " 34px",
                            transform: " translate(-27px, 13px)",
                            fontweight: "500",
                          },
                        }}
                      />
                    ) : (
                      "Loading..." // Or any loading indicator you prefer
                    )}
                  </div>
                </div>
                <div className="CardDasH mt-3">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <div className="blueBox">
                        <div className="BookIcon mb-2">
                          <i className="mb-3">
                            <GiOpenBook />
                          </i>
                        </div>

                        <div> <h3 className="">{profileInfo.enrolledCourses}</h3></div>
                        <div><h6 className="">Enrolled Courses</h6></div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <div className="blueBox orange">
                        <div className="BookIcon orange mb-2">
                          <i className="mb-3">
                            <RiComputerLine />
                          </i>
                        </div>

                        <h3 className="">{profileInfo.activeCourses}</h3>
                        <h6 className="">Active Courses</h6>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <div className="blueBox grn">
                        <div className="BookIcon grn mb-2">
                          <i className="mb-3">
                            <GiTrophyCup />
                          </i>
                        </div>

                        <h3 className="">{profileInfo.completedCourses}</h3>
                        <h6 className="">Completed Courses</h6>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <div className="blueBox vilot">
                        <div className="BookIcon vilot mb-2">
                          <i className="mb-3">
                            <SlBadge />
                          </i>
                        </div>

                        <h3 className="">{profileInfo.noOfCertificates}</h3>
                        <h6 className="">Certificate</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
