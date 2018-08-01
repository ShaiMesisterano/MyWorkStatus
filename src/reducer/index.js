import {combineReducers} from 'redux';
import dashboardReducer from './dashboardReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';

export default combineReducers({
    dashboardReducer,
    loginReducer,
    registerReducer
});
