import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPostsByUser } from "../../redux/post.js";
import "./Post.css"; // Create a CSS file for styling

const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData]= useState([])

  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUser(userId, (result) => {
        console.log("Callback result:", result);
        setData(result.data)
      }));
    }
  }, [userId, dispatch]);
  console.log(data,"userPosts")
  return (
    <div className="UserPosts">
      <div className="PageHeaders">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="PageTitle pt-5">
                <h2>User Posts</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="PostsSection pt-5 pb-5">
        <div className="container">
          <div className="row pt-3 pb-3">
            {/* {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>} */}
            {/* {status === 'false' && userPosts.length === 0 && <p>No posts available.</p>} */}
            {data?.map((item) => (
              <div key={item.id} className="col-lg-6 col-md-12">
                <div className="row posts-page-box" style={{cursor: "pointer"}}>
                  <div className="col-lg-12">
                    <div className="PostContent">
                        <h2>{item.content}</h2>
                      
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
