import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutCall } from '../../actions/authActions';

function Logout(props) {
	const navigate = useNavigate();

	console.log('LOGOUT renders');
	useEffect(() => {
		localStorage.removeItem('user');
		props.logoutCall();
		navigate('/');
	}, []);
	return <div></div>;
}

export default connect(null, { logoutCall })(Logout);
