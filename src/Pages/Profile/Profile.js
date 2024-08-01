import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userInfo } from '../../redux/user';
import { getPostsByUser } from '../../redux/post';
import { getlikesByUser } from '../../redux/like';
import { loader } from '../../redux/common';
import { toast } from "react-toastify";
import { getAllfollow } from '../../redux/follow';
const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [user,setUser] = useState();
  
  const [totalPosts,setTotalPosts] = useState(0);
  
  

  useEffect(() => {
    dispatch(loader(true));
    dispatch(
      userInfo(userId, (resp) => {
        if (resp.status) {
          setUser(resp.data);

        } else {
          toast.error(resp.message);
        }
        dispatch(loader(false));
      })
    );
    dispatch(
      getPostsByUser(userId,(resp) => {
        if (resp.status) {
          setTotalPosts(resp.data?.length);
        } else {
          toast.error(resp.message);
        }
        dispatch(loader(false));
      })
    );
  
  }, [userId]);

  
  return (
    <div className="UserProfile">
      <h1>User Profile</h1>
      <div>
        <strong>Name:</strong> {user?.name}
      </div>
      <div>
        <strong>Email:</strong> {user?.email}
      </div>
      <div>
        <strong>Total Posts:</strong> {totalPosts}
      </div>
     
    </div>
  );
};

export default Profile;
