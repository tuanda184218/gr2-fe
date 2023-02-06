import axios from "axios";

const API_URL = "http://localhost:8085/"

const postRegister = (username, email, password, role) => {
    return axios.post(API_URL + "api/auth/signup", {
      username: username,
      email: email,
      password: password,
      role: role,
    });
};

const postLogin = (username, password) => {
    return axios.post(API_URL + "api/auth/signin", {
      username: username,
      password: password,
    });
  };

export {postRegister, postLogin};