import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginCall } from '../../actions/authActions';
import Error from '../common/Error';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../../axios';

function Login(props) {
	const username = useRef();
	const password = useRef();
	const [showPW, setShowPW] = useState(false);
	const [err, setErr] = useState('');
	const navigate = useNavigate();
	const { user, isFetching, loginCall } = props;

	console.log(
		'LOGIN RENDERS',
		user,
		'localstorage: ',
		localStorage.getItem('user')
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = {
			username: username.current.value,
			password: password.current.value,
		};

		axios()
			.post('https://letchat-backend.herokuapp.com/api/auth/login', user)
			.then((res) => {
				const user = res.data;
				localStorage.setItem('user', JSON.stringify(user));
				loginCall(user);
				navigate('/');
			})
			.catch((err) => setErr(err.response.data));
	};

	const togglePassword = () => {
		setShowPW(!showPW);
	};

	return (
		<div>
			<h1>Log in</h1>
			<form onSubmit={handleSubmit}>
				<input placeholder='Username' ref={username} type='text' />
				<input
					placeholder='Password'
					required
					ref={password}
					type={showPW ? 'text' : 'password'}
				/>
				<input type='checkbox' onClick={togglePassword} />
				Show password
				{err ? <Error error={err} setError={setErr} /> : <></>}
				<button type='submit' disabled={isFetching}>
					{isFetching ? <CircularProgress /> : 'Log in'}
				</button>
			</form>
			{isFetching ? (
				<div style={{ color: 'primary' }}>is fetching.....</div>
			) : (
				<></>
			)}
			<div>
				<div>
					Don't have an account?
					<span>
						<Link to='/register'>Sign up</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		isFetching: state.auth.isFetching,
	};
};

export default connect(mapStateToProps, { loginCall })(Login);
