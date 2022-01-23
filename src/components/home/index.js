import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
	const navigate = useNavigate();

	console.log(
		'home renders, user: ',
		props.user,
		'localstorage: ',
		localStorage.getItem('user')
	);

	return (
		<div>
			<h1>Welcome to my LetChat!!!! let's get started!</h1>

			<div>
				<button onClick={() => navigate('/chat-rooms')}>Chat</button>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(HomePage);
