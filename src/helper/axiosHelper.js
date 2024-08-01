import axios from "axios";

const helper = {
  baseUrl: function () {
    
 const URL = "http://localhost:4000/"
 

    return URL;
  },
  postData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "true",
        Authorization: localStorage.getItem("oAuth"),
      },
    };

    // console.log(localStorage.getItem("oAuth"));
    return await axios
      .post(url, data, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  deleteData: async function (url) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "true",
        Authorization: localStorage.getItem("oAuth"),
      },
    };

    // console.log(localStorage.getItem("oAuth"));
    return await axios
      .delete(url, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  patchData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "true",
        Authorization: localStorage.getItem("oAuth"),
      },
    };

    // console.log(localStorage.getItem("oAuth"));
    return await axios
      .patch(url, data, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  pathFormdata: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "true",
        Authorization: localStorage.getItem("oAuth"),
      },
    };

    // console.log(localStorage.getItem("oAuth"));
    return await axios
      .patch(url, data, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  formData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "true",
        Authorization: localStorage.getItem("oAuth"),
      },
      maxContentLength: 500 * 1024 * 1024,
    };

    // console.log(localStorage.getItem("oAuth"));
    return await axios
      .post(url, data, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "true",
        Authorization: localStorage.getItem("oAuth"),
      },
    };
    return await axios.get(url, axiosConfig).then((res) => {
      if (res) {
        return res;
      }
    });
  },
  queryData: async function (url, query) {
    return await axios.get(url, query).then((res) => {
      if (res) {
        return res;
      }
    });
  },
};

export default helper;
