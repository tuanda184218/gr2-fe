import axios from "axios";

export const API_URL = "http://localhost:8085/"

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

  const postCreateProduct = (productName, year, price, url) => {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    let config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
  
    return axios.post(
      API_URL + "api/products/insert",
      {
        productName: productName,
        year: year,
        price: price,
        url: url,
      },
      config
    );
  };

  const postImage = (image) => {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":"multipart/form-data"

      },
    };
    const data = new FormData();
    data.append("file",image);
    return axios.post(API_URL + "api/products/FileUpload",data,
    config
  );
}

export {postRegister, postLogin, postCreateProduct, postImage};