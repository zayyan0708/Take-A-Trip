import { combineReducers } from 'redux';
import cimMenuReducer from './Create-Itineary-Manual/cim-reducers';
import userReducer from './User/user-reducers';


const rootReducer = combineReducers({
    cimMenu: cimMenuReducer,
    userReduce: userReducer
});

export default rootReducer;