import { createSlice } from "@reduxjs/toolkit";
import Helper from "../helper/axiosHelper";
const baseUrl = Helper.baseUrl();

const initialState = {
  follow: [],
  userfollow: [],
  status: 'idle',
  error: null,
};

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setfollow: (state, action) => {
      state.follow = action.payload;
    },
    setUserfollow: (state, action) => {
      state.userfollow = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setfollow, setUserfollow, setStatus, setError } = followSlice.actions;

export default followSlice.reducer;

// Async thunk actions
export const followUser = (userId, callback = () => { }) => async (dispatch) => {
  try {
    const result = await Helper.postData(baseUrl + `${userId}/follow`).then(
      (response) => response.data
    );
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getAllfollow = (callback = () => { }) => async (dispatch) => {
  try {
    const result = await Helper.getData(baseUrl+`followed-posts`).then(
      (response) => response.data
    );
    console.log(result)
    dispatch(setfollow(result));
    callback(result);
  } catch (error) {
    dispatch(setError(error.message));
  }
};


