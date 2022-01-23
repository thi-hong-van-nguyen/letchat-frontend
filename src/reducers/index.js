import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	activeChat: chatReducer,
});

export default rootReducer;
