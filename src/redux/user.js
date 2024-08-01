import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import Helper from "../helper/axiosHelper";
const baseUrl = Helper.baseUrl();

const initialState = {
  firstSignUp: {},
  secSignUp: {},
  searchValue: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    firstSignUp: (state, action) => {
      state.firstSignUp = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isLoggin = action.payload;
    },
   
  },
});

export const { firstSignUp, setLoginStatus} = userSlice.actions;

export default userSlice.reducer;


export const userRegister =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(baseUrl + "user/register", data).then(
      (response) => response.data
    );
    console.log(data,result)
    callback(result);
  };

export const userLogin =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(baseUrl + "user/login", data).then(
      (response) => response.data
    );
    callback(result);
  };
export const userInfo =
  (userId, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + `user/userInfo/${userId}`).then(
      (response) => response.data
    );
    console.log("userIduserId",userId,result)
    callback(result);
  };
