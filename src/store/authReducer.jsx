const initialState = {
  auth: false,
  userId: null
};

const AUTH_ON = "AUTH_ON";
const AUTH_OFF = "AUTH_OFF";

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ON:
      return {
        ...state,
        auth: true,
        userId: action.userId
      };
    case AUTH_OFF:
      return {
        ...state,
        auth: false,
        userId: null
      };
    default:
      return {
        ...state
      };
  }
};

export const authOnAction = (userId) => ({type: AUTH_ON, userId});
export const authOffAction = (userId) => ({type: AUTH_OFF, userId});