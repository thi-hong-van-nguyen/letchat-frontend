import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';
import defaultProfilePic from '../../photos/defaultProfilePic.jpg';
import { getActiveChat } from '../../actions/chatActions';

function Conversation(props) {
	const { key, conversation, user, getActiveChat, setCurrentChat } = props;
	const [currentFriend, setCurrentFriend] = useState(null);

	useEffect(() => {
		const friendId = conversation.members.find((m) => m !== user._id);
		const getFriend = () => {
			axios()
				.get(`/api/users/${friendId}`)
				.then((res) => setCurrentFriend(res.data))
				.catch((err) => console.log(err));
		};

		getFriend();
	}, []);

	const handleClick = () => {
		setCurrentChat({
			conversationId: conversation._id,
			friendId: currentFriend._id,
			friendPic: currentFriend.profilePic,
		});
	};

	console.log('ACTIVE CHAT ==> ', props.activeChat);

	return (
		<div key={key} onClick={handleClick}>
			<img
				src={
					currentFriend?.profilePic
						? currentFriend.profilePic
						: defaultProfilePic
				}
				alt=''
				style={{ width: '100px', height: '100px' }}
			/>
			<div>{currentFriend?.username}</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		activeChat: state.auth.activeChat,
	};
};

export default connect(mapStateToProps, { getActiveChat })(Conversation);
