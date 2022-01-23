import {
	CHANGE_PROFILE,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGOUT,
	UPDATE_LOGIN,
} from '../actions/authActions';

const initialState = {
	isFetching: false,
	user: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LOGIN:
			return {
				...state,
				user: action.payload,
			};
		case LOGIN_START:
			return {
				...state,
				isFetching: true,
				user: null,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isFetching: false,
				user: action.payload,
			};
		case CHANGE_PROFILE:
			return {
				...state,
				user: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;
