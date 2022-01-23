import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';

import './styling/index.css';
import ChatRooms from './components/chat';
import HomePage from './components/home';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import axios from './axios/';
import { connect } from 'react-redux';
import Profile from './components/profile/Profile';
import { updateLoginCall } from './actions/authActions';

function App(props) {
	const navigate = useNavigate();
	const { updateLoginCall } = props;
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const getLoggedInUser = () => {
			axios()
				.get(`/api/users/${user._id}`)
				.then((res) => {
					updateLoginCall(res.data);
					localStorage.setItem('user', JSON.stringify(res.data));
				})
				.catch((err) => navigate('/logout'));
		};

		if (user) {
			getLoggedInUser();
		}
	}, []);

	console.log('app renders', props.user);

	return (
		<div className='app'>
			<Header />

			<Routes>
				<Route path='/chat-rooms' element={<ChatRooms />} />
				<Route path='/home' element={<Navigate to='/' />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/logout' element={<Logout />} />
				<Route path='/profile/:_id' element={<Profile />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { updateLoginCall })(App);
