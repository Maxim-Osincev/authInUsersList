const initialState = {
    forgotPassword: false
};

const FORGOT_PASSWORD_ON = 'FORGOT_PASSWORD_ON';
const FORGOT_PASSWORD_OFF = 'FORGOT_PASSWORD_OFF';

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type){
        case FORGOT_PASSWORD_ON:
            return {
                ...state,
                forgotPassword: true
            };
        case FORGOT_PASSWORD_OFF:
            return {
                ...state,
                forgotPassword: false
            };
        default:
            return {
                ...state
            };
    }
};

export const forgotPasswordOnAction = () => ({type: FORGOT_PASSWORD_ON});
export const forgotPasswordOffAction = () => ({type: FORGOT_PASSWORD_OFF});