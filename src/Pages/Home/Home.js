import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loader, isLogin } from "../../redux/common";
import { getAllPosts } from "../../redux/post.js";
import { likePost, checkLikeStatus } from "../../redux/like.js";
import { followUser, checkFollowStatus } from "../../redux/follow";
import {jwtDecode} from 'jwt-decode';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [allPosts, setAllPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [followedUsers, setFollowedUsers] = useState({});
  const isLoginStatus = useSelector((state) => state.apiReducer.isLogin);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetDiv = document.querySelector(hash);
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    dispatch(loader(true));
    dispatch(
      getAllPosts((resp) => {
        if (resp.status) {
          setAllPosts(resp.data);
          // Check like and follow status for each post and user
          resp.data.forEach(post => {
            checkLikeStatus(post.id);
            checkFollowStatus(post.user_id);
          });
        } else {
          toast.error(resp.message);
        }
        dispatch(loader(false));
      })
    );
  }, [page, limit]);
  

  const checkLikeStatus = (postId) => {
    dispatch(likePost(postId, (result) => {
      if (result.status) {
        setLikedPosts(prevState => ({ ...prevState, [postId]: result.liked }));
      }
    }));
  };

  const checkFollowStatus = (userId) => {
    dispatch(followUser(userId, (result) => {
      if (result.status) {
        setFollowedUsers(prevState => ({ ...prevState, [userId]: result.followed }));
      }
    }));
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
  }, [isLoginStatus, dispatch]);

  useEffect(() => {
    const { state } = location;
    if (state && state.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
    }
  }, [location]);

  const handleFollow = (userId) => {
    dispatch(loader(true));
    dispatch(
      followUser(userId, (result) => {
        dispatch(loader(false));
        if (result.status) {
          toast.success(result.message);
          setFollowedUsers(prevState => ({ ...prevState, [userId]: true }));
        } else {
          toast.error(result.message);
        }
      })
    );
  };

  const handleLike = (postId) => {
    dispatch(loader(true));
    dispatch(
      likePost(postId, (result) => {
        console.log("result",result)
        dispatch(loader(false));
        if (result.status) {
          toast.success(result.message);
          setLikedPosts(prevState => ({ ...prevState, [postId]: true }));
        } else {
          toast.error(result.message);
        }
      })
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      autoLogOut();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const autoLogOut = () => {
    if (localStorage.getItem("oAuth")) {
      const jwt_Token_decoded = jwtDecode(localStorage.getItem("oAuth"));
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("oAuth");
        localStorage.clear();
        navigate("/");
        dispatch(isLogin(false));
        toast.error("Session expired. Please login to proceed");
      }
    }
  };

  return (
    <div className="HomEPage">
      {/* <Header /> */}
      <div className="ExplorCAtegory pb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PAgeTit pt-3 pb-3">
                <h2>Explore posts</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center pt-2">
            {allPosts.map((item) => (
              <div
                key={item.id}
                className="col-lg-4 col-md-6 col-sm-6 col-6"
                style={{ cursor: "pointer" }}
              >
                <div className="CAteGorey">
                  <h6 className="dateheading">
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h6>
                  <p
                    onClick={() => {
                      navigate(`${item.user_id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {item.content}
                  </p>
                  <div className="PostActions">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="btn btn-like"
                    >
                      {likedPosts[item.id] ? 'Liked' : 'Like'}
                    </button>
                    <button
                      onClick={() => handleFollow(item.user_id)}
                      className="btn btn-follow"
                    >
                      {followedUsers[item.user_id] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="paginationButtons">

          <button onClick={() => setPage(page => Math.max(page - 1, 1))} >Previous</button>
          <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
