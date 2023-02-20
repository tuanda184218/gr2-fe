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

  const postCreateProduct = (userId, productName, description, price, image) => {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      },
    };

    const data = new FormData();
    data.append("userId",userId);
    data.append("productName",productName);
    data.append("description",description);
    data.append("price",price);
    data.append("image",image);
  
    return axios.post(
      API_URL + "api/products/",
        data,
      config
    );
  };


const postCreateUser = (username, email, password, role) => {
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  return axios.post(
    API_URL + "api/users/create",
    {
      username: username,
      email: email,
      password: password,
      role: role,
    },
    config
  );
};

const getAllUsers = () =>{
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  return axios.get(
    API_URL + "api/users/",
    config
  );
}

const putUpdateUser = (userId, email, role) =>{
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    // params: {id: userId}
  };

  return axios.put(
    API_URL + "api/users/" + userId,
    {
      email: email,
      role: role
    },
    config
  );

}

const deleteUser = (userId) =>{
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  return axios.delete(
    API_URL + "api/users/" + userId,
    config
  );

}

const getAllProducts = () => {
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  return axios.get(
    API_URL + "api/products",
    config
  );

}

const putUpdateProduct = (productId, productName, description, price, image) =>{
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":"multipart/form-data"
    },
  };

  
  const data = new FormData();
  data.append("productName",productName);
  data.append("description",description);
  data.append("price",price);
  data.append("image",image);

  return axios.put(
    API_URL + "api/products/" + productId,
    data,
    config
  );

}


const deleteProduct = (productId) =>{
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  return axios.delete(
    API_URL + "api/products/" + productId,
    config
  );

}



export {postRegister, postLogin, postCreateProduct, postCreateUser, getAllUsers, putUpdateUser, deleteUser, getAllProducts, putUpdateProduct, deleteProduct};