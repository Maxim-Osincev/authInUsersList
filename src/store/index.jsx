import { combineReducers, createStore } from 'redux';
import { authReducer } from './authReducer.jsx';
import { registerReducer } from './registerReducer.jsx';
import { forgotPasswordReducer } from './forgotPasswordReducer.jsx';
import { listContactsReducer } from './listContactsReducer.jsx';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    auth: authReducer,
    registred: registerReducer,
    forgotPassword: forgotPasswordReducer,
    listContacts: listContactsReducer
});

export const store = createStore(rootReducer, composeWithDevTools())