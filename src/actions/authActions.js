export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const CHANGE_PROFILE = 'CHANGE_PROFILE';

export const updateLoginCall = (user) => (dispatch) => {
	dispatch({ type: UPDATE_LOGIN, payload: user });
};

export const loginCall = (user) => (dispatch) => {
	dispatch({ type: LOGIN_START });
	dispatch({ type: LOGIN_SUCCESS, payload: user });
};

export const logoutCall = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};

export const changeProfile = (updatedUser) => (dispatch) => {
	localStorage.setItem('user', JSON.stringify(updatedUser));
	dispatch({ type: CHANGE_PROFILE, payload: updatedUser });
};
