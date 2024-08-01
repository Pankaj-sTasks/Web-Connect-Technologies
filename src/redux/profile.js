import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import Helper from "../helper/axiosHelper";
const baseUrl = Helper.baseUrl();

const initialState = {
  //   firstSignUp: {},
  //   secSignUp: {},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // firstSignUp: (state, action) => {
    //   state.firstSignUp = action.payload;
    // },
    // secSignUp: (state, action) => {
    //   state.secSignUp = action.payload;
    // },
  },
});

export const { firstSignUp, secSignUp, getReasonList } = profileSlice.actions;

export default profileSlice.reducer;

export const userCartWishNameInfo =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/cartNWishlistInfo").then(
      (response) => response.data
    );
    callback(result);
  };
  export const userNotifications =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/notifications").then(
      (response) => response.data
    );
    callback(result);
  };
 
  export const  userNotificationsread =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(
      baseUrl + "user/notification_is_read",
      data
    ).then((response) => response.data);
    callback(result);
  };
  export const userPersonalDetail =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/personnelInfo").then(
      (response) => response.data
    );
    callback(result);
  };
  export const collegeList =
  ( data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(
      baseUrl + "courses/institutions", data
      
    ).then((response) => response.data);
    callback(result);
  };
export const userPersonalInfo =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.patchData(
      baseUrl + "user/personnelInfo",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const userPasswordInfo =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.patchData(
      baseUrl + "user/passwordInfo",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const userAddressDetail =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/addressInfo").then(
      (response) => response.data
    );
    callback(result);
  };

export const userAddressInfo =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.patchData(
      baseUrl + "user/addressInfo",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const userAcademicDetail =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/academicInfo").then(
      (response) => response.data
    );
    callback(result);
  };

export const userAcademicInfo =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.patchData(
      baseUrl + "user/academicInfo",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const userProfessionalDetail =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/professionalInfo").then(
      (response) => response.data
    );
    callback(result);
  };

export const userProfessionalInfo =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.patchData(
      baseUrl + "user/professionalInfo",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const userProfilePic =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.pathFormdata(
      baseUrl + "user/uploadPicture",
      data
    ).then((response) => response.data);
    callback(result);
  };
export const subcribeNewsLetter =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(
      baseUrl + "user/subscribe_our_newsletter",
      data
    ).then((response) => response.data);
    callback(result);
  };

  export const userDashboard =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/dashboardProfileStatus").then(
      (response) => response.data
    );
    callback(result);
  };

  export const userDashboardInfo =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/dashboardInfo").then(
      (response) => response.data
    );
    callback(result);
  };
