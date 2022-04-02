const initialState = {
    registred: false
};

const REGISTER_ON = 'REGISTER_ON';
const REGISTER_OFF = 'REGISTER_OFF';

export const registerReducer = (state = initialState, action) => {
    switch (action.type){
        case REGISTER_ON:
            return {
                ...state,
                registred: true
            };
        case REGISTER_OFF:
            return {
                ...state,
                registred: false
            };
        default:
            return {
                ...state
            };
    }
};

export const registerOnAction = () => ({type: REGISTER_ON});
export const registerOffAction = () => ({type: REGISTER_OFF});