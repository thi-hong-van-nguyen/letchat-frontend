import React, { useState } from 'react';
import ContactList from './ContactList';
import Messages from './Messages';
import ChatPlaceHolder from './ChatPlaceHolder';
import { contactList, messagesList } from '../../mockData';
import PrivateMessage from '../common/PrivateMessage';
import { connect } from 'react-redux';

function ChatRooms(props) {
	const [currentChat, setCurrentChat] = useState(null);
	const { user } = props;

	return (
		<div className='chatrooms'>
			<ContactList setCurrentChat={setCurrentChat} />
			<Messages currentChat={currentChat} />
			{/* {user ? (
				<>
					<ContactList contactList={contactList} setChat={setChat} />
					{selectedChat ? (
						<Messages messagesList={messagesList} selectedChat={selectedChat} />
					) : (
						<ChatPlaceHolder />
					)}
				</>
			) : (
				<PrivateMessage />
			)} */}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(ChatRooms);
