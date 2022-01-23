import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../../axios';

function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const [showPW, setShowPW] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password.current.value !== passwordAgain.current.value) {
			passwordAgain.current.setCustomValidity("Passwords don't mactch");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};

			// console.log(user);

			axios()
				.post('/api/auth/register', user)
				.then((res) => {
					navigate('/login');
				})
				.catch((err) => setError(err.response.data.message));
		}
	};

	const togglePassword = () => {
		setShowPW(!showPW);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input placeholder='Username' required ref={username} />
				<input placeholder='Email' type='email' required ref={email} />
				<input
					placeholder='Password'
					required
					type={showPW ? 'text' : 'password'}
					ref={password}
				/>
				<input
					placeholder='Password again'
					required
					type={showPW ? 'text' : 'password'}
					ref={passwordAgain}
				/>
				<input type='checkbox' onClick={togglePassword} />
				Show password
				<button>Sign up</button>
			</form>
			<div>
				<div>
					Already have an account?
					<span>
						<Link to='/login'>Log in</Link>
					</span>
				</div>
			</div>

			{error ? <div>{error}</div> : <></>}
		</div>
	);
}

export default Register;
