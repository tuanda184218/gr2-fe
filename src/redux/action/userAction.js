export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const doLogin = (res) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: res,
  };
};

export const doLogout = (res) => {
  return {
    type: USER_LOGOUT_SUCCESS
  };
};
