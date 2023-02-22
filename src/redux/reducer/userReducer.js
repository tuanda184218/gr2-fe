import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
    account: {
      id: 0,
      email: "",
      username: "",
      token: "",
      roles: [],
    },
    isAuthenticated: false,
  };
  
  const userReducer = (state = INITIAL_STATE, action) => {
    // console.log(action);
    switch (action.type) {
      case FETCH_USER_LOGIN_SUCCESS:
        return {
          ...state,
          account: {
            id: action?.payload?.data?.id,
            email: action?.payload?.data?.email,
            username: action?.payload?.data?.username,
            token: action?.payload?.data?.accessToken,
            roles: action?.payload?.data?.roles,
          },
          isAuthenticated: true,
        };
      case USER_LOGOUT_SUCCESS:
        return{
          ...state, account: {
            id: 0,
            email: "",
            username: "",
            token: "",
            roles: [],
          },
          isAuthenticated: false,
        }

      default: {
        return state; // We return the default state here
      }
    }
  };
  
  export default userReducer;
  