import React, { useState } from 'react';
import ContactList from './ContactList';
import Conversations from './Conversations';
import ChatPlaceHolder from './ChatPlaceHolder';
import { contactList, messagesList } from '../../mockData';
import PrivateMessage from '../common/PrivateMessage';
import { connect } from 'react-redux';

function ChatRooms(props) {
	const [selectedChat, setChat] = useState();
	const { user } = props;

	return (
		<div className='chatrooms'>
			{user ? (
				<>
					<ContactList contactList={contactList} setChat={setChat} />
					{selectedChat ? (
						<Conversations
							messagesList={messagesList}
							selectedChat={selectedChat}
						/>
					) : (
						<ChatPlaceHolder />
					)}
				</>
			) : (
				<PrivateMessage />
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(ChatRooms);
