import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal, ModalBody, InputGroup, Form } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';
import profileImage from '../../assets/images/imgdummy.png';
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import './Header.css';
import { userRegister, userLogin } from '../../redux/user';
import { loader, isLogin } from "../../redux/common";
import { useForm } from "react-hook-form";
import { createPost } from '../../redux/post.js';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginStatus = useSelector((state) => state.apiReducer.isLogin);

  const [modal, setModal] = useState(false);
  const [modalsignin, setModalsignin] = useState(false);
  const [showcontent, setShowcontent] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

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
      }else{
        setUserId(jwt_Token_decoded.id)
      }
    }
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
  const handleLogout = () => {
    localStorage.removeItem("oAuth");
    localStorage.removeItem("isLogin");
    navigate("/");
    dispatch(isLogin(false));
    toast.success("You have logged out successfully");
  };
  const handleProfile = (e) => {
    console.log("profile",userId)
    e.preventDefault()
    if(isLoginStatus){
      navigate(`/profile/${userId}`);
    }
   
  };

  const handleLogin = () => {
    setShowcontent(0);
    setModalsignin(true);
    navigate('/login');
  };

  const handleRegister = () => {
    setShowcontent(1);
    setModalsignin(true);
    navigate('/register');
  };

  const toggle = () => setModal(!modal);
  const togglesignin = () => setModalsignin(!modalsignin);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn } } = useForm();
  const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp } } = useForm();

  const signUp = (data) => {

    console.log(data,"signup")
    dispatch(loader(true));
    dispatch(
      userRegister(data, (result) => {
        dispatch(loader(false));
        if (result.status) {
          toast.success(result.message);
          handleLogin()
        } else {
          toast.error(result.message);
          setShowcontent(1);
        }
      })
    );
  };

  const signInFn = (data) => {
    
    dispatch(userLogin(data, (result) => {
      if (result.status) {
        console.log(result)
        toast.success(result.message);
        localStorage.setItem("oAuth", "Bearer " + result.token);
        localStorage.setItem("isLogin", true);
        dispatch(isLogin(true));
        togglesignin();
      } else {
        toast.error(result.message);
      }
    }));
  };
  const handleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    // Define data object with content
    const data = {
      content: content, // Assuming postContent is your state for the post content
    };
    
    console.log(data, "post");
  
    // Dispatch loader action to show loading spinner
    dispatch(loader(true)); 
  
    // Dispatch createPost action
    dispatch(
      createPost(data, (result) => {
        dispatch(loader(false)); // Hide loading spinner
  
        if (result.status) {
          toast.success(result.message);
          setShowCreatePost(false); // Hide the create post form
        } else {
          toast.error(result.message);
        }
      })
    );
    
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header-top">
          <div className="header-actions">
            {isLoginStatus ? (
              <>
                <div className="profile-logo" >
                
                <img src={profileImage} alt="Profile"  onClick={handleProfile}/>
                 
                </div>
                <button onClick={handleLogout}>Logout</button>
                 <button onClick={handleCreatePost}>Create Post</button>
              </>
            ) : (
              <>
                <button onClick={handleLogin}>Sign In / Up</button>
                {/* <button onClick={handleRegister}>Register</button> */}
              </>
            )}
          </div>
        </div>
      </div>
      {showCreatePost && (
        <div className="create-post">
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
            />
            <button type="submit">Submit Post</button>
          </form>
        </div>
      )}
      {/* Sign In Modal */}
      <Modal show={modalsignin} onHide={togglesignin}>
        <ModalBody>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{showcontent === 0 ? 'Sign In' : 'Sign Up'}</h2>
            </div>
            <form className="form-container" onSubmit={showcontent === 0 ? handleSubmitSignIn(signInFn) : handleSubmitSignUp(signUp)}>
              {showcontent === 0 ? (
                <>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Email"
                      name="email"
                      type="email"
                      {...registerSignIn('email', { required: 'Email is required' })}
                    />
                    <InputGroup.Text><GrMail /></InputGroup.Text>
                  </InputGroup>
                  {errorsSignIn.email && <small style={{ color: 'red' }}>{errorsSignIn.email.message}</small>}
                  
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Password"
                      name="password"
                      type={passwordVisible ? 'text' : 'password'}
                      {...registerSignIn('password', { required: 'Password is required' })}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility}>
                      {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </InputGroup.Text>
                   {" "}
                  </InputGroup>
                  {errorsSignIn.password && <small style={{ color: 'red' }}>{errorsSignIn.password.message}</small>}
                  
                  <button type="submit">Sign In</button>
                  <p>Don't have an account yet? <Link onClick={handleRegister}>SIGN UP</Link></p>
                </>
              ) : (
                <>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="User Name"
                      name="username"
                      {...registerSignUp('username', { required: 'Username is required' })}
                    />
                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
                  </InputGroup>
                  {errorsSignUp.username && <small style={{ color: 'red' }}>{errorsSignUp.username.message}</small>}

                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Email"
                      name="email"
                      type="email"
                      {...registerSignUp('email', { required: 'Email is required' })}
                    />
                    <InputGroup.Text><GrMail /></InputGroup.Text>
                  </InputGroup>
                  {errorsSignUp.email && <small style={{ color: 'red' }}>{errorsSignUp.email.message}</small>}
                  
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Password"
                      name="password"
                      type={passwordVisible ? 'text' : 'password'}
                      {...registerSignUp('password', { required: 'Password is required' })}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility}>
                      {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </InputGroup.Text>
                   
                  </InputGroup>
                  {errorsSignUp.password && <small style={{ color: 'red' }}>{errorsSignUp.password.message}</small>}
                  
                  <button type="submit">Sign Up</button>
                  <p>Already have an account? <Link onClick={handleLogin}>SIGN IN</Link></p>
                </>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Header;
