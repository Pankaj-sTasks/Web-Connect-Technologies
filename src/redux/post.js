import { createSlice } from "@reduxjs/toolkit";
import Helper from "../helper/axiosHelper";
const baseUrl = Helper.baseUrl();

const initialState = {
  posts: [],
  userPosts: [],
  status: 'idle',
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setUserPosts, setStatus, setError } = postsSlice.actions;

export default postsSlice.reducer;

// Async thunk actions
export const createPost = (postData, callback = () => {}) => async (dispatch) => {
  try {
    const result = await Helper.postData(baseUrl, postData).then(
      (response) => response.data
    );
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getAllPosts = (data,callback = () => {}) => async (dispatch) => {
  try {
    const result = await Helper.getData(baseUrl+`?page=${data.page}&limit=${data.limit}`).then(
      (response) => response.data
    );
    console.log(result)
    dispatch(setPosts(result));
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getPostsByUser = (userId, callback = () => {}) => async (dispatch) => {
  try {
    console.log(baseUrl + `${userId}`)
    const result = await Helper.postData(baseUrl + `${userId}`).then(
      (response) => response.data
    );
    dispatch(setUserPosts(result));
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
