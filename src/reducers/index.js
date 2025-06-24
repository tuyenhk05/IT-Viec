import { combineReducers } from 'redux';
import  loginReducer  from './login.js'; 

const allReducers = combineReducers({
    loginReducer,
});

export default allReducers;

