import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import defaultProfilePic from '../../photos/defaultProfilePic.jpg';
import { connect } from 'react-redux';
import axios from '../../axios';
import Conversation from './Conversation';

function ContactListContainer(props) {
	const { user, setCurrentChat } = props;
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = () => {
			axios()
				.get(`/api/conversations/${user?._id}`)
				.then((res) => setConversations(res.data))
				.catch((err) => console.log(err));
		};

		getConversations();
	}, [user]);

	console.log(conversations);
	console.log('CONTACTLIST renders ======>', user);
	return (
		<div className='contact-list'>
			{/* USER PIC */}
			<div className='contact-list__profile'>
				<img
					src={user?.profilePic ? user.profilePic : defaultProfilePic}
					alt=''
				/>
			</div>

			{/* SEARCH BAR */}
			<div className='contact-list__search'>
				<SearchIcon />
				<input placeholder='enter username...' />
			</div>

			{/* CONTACT LIST */}
			<div className='contact-items'>
				{conversations.length > 0 ? (
					conversations.map((conversation, idx) => (
						// <div key={idx} onClick={() => setCurrentChat(conversation)}>
						<Conversation
							key={idx}
							conversation={conversation}
							setCurrentChat={setCurrentChat}
						/>
						// </div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(ContactListContainer);
