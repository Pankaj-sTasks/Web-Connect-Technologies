import { createSlice } from "@reduxjs/toolkit";
import Helper from "../helper/axiosHelper";
const baseUrl = Helper.baseUrl();

const initialState = {
  likes: [],
  userlikes: [],
  status: 'idle',
  error: null,
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setlikes: (state, action) => {
      state.likes = action.payload;
    },
    setUserlikes: (state, action) => {
      state.userlikes = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setlikes, setUserlikes, setStatus, setError } = likesSlice.actions;

export default likesSlice.reducer;

// Async thunk actions
export const likePost = (postId, callback = () => {}) => async (dispatch) => {
  try {
    const result = await Helper.postData(baseUrl+`${postId}/like`).then(
      (response) => response.data
    );
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getAlllikes = (callback = () => {}) => async (dispatch) => {
  try {
    const result = await Helper.getData(baseUrl).then(
      (response) => response.data
    );
    console.log(result)
    dispatch(setlikes(result));
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getlikesByUser = ( callback = () => {}) => async (dispatch) => {
  try {
    
    const result = await Helper.getData(baseUrl+`likesByYou`).then(
      (response) => response.data
    );
    dispatch(setUserlikes(result));
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
