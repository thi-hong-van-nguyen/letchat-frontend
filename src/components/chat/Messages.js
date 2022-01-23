import React, { useEffect, useState } from 'react';
import avt from '../../photos/avt.jpg';
import MoodIcon from '@mui/icons-material/Mood';
import { IconButton } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Picker from 'emoji-picker-react';
import { connect } from 'react-redux';
import ChatPlaceHolder from './ChatPlaceHolder';
import axios from '../../axios';
import { format } from 'timeago.js';
import defaultProfilePic from '../../photos/defaultProfilePic.jpg';
import { io } from 'socket.io-client';

function Messages(props) {
	const [text, setText] = useState('');
	const [pickerVisible, setPickerVisible] = useState(false);
	const [messageList, setMessageList] = useState([]);
	const { activeChat, currentChat, user } = props;
	const [own, setOwn] = useState(false);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		setSocket(io('ws://localhost:8900'));
	}, []);

	useEffect(() => {
		socket?.on('welcome', (message) => {
			console.log(message);
		});
    }, [socket]);
    
	console.log(socket);

	useEffect(() => {
		axios()
			.get(`/api/messages/${currentChat?.conversationId}`)
			.then((res) => {
				setMessageList(res.data);
			})
			.catch((err) => console.log(err));
	}, [currentChat]);

	const setPic = (pic) => {
		if (pic) {
			return pic;
		} else {
			return defaultProfilePic;
		}
	};

	const onEmojiClick = (e, emojiObject) => {
		setText(text + emojiObject.emoji);
		setPickerVisible(false);
	};

	const send = () => {
		const newMessage = {
			conversationId: currentChat.conversationId,
			sender: user._id,
			text: text,
		};
		axios()
			.post('/api/messages', newMessage)
			.then((res) => setMessageList([...messageList, res.data]))
			.catch((err) => console.log(err));

		setText('');
	};

	const onEnterPress = (e) => {
		if (e.key === 'Enter') {
			send();
		}
	};

	const sendMsg = (e) => {
		e.preventDefault();
		send();
	};
	console.log(text);

	return (
		<div className='Messages'>
			{messageList.length === 0 ? (
				<ChatPlaceHolder />
			) : (
				<div>
					<div>
						{messageList.map((m, idx) => (
							<div
								key={idx}
								className={m.sender === user._id ? 'sender' : 'receiver'}
							>
								<img
									alt=''
									src={
										m.sender === user._id
											? setPic(user.profilePic)
											: setPic(currentChat.friendPic)
									}
									style={{ width: '80px', height: '80px' }}
								/>
								<div>{m.text}</div>
								<div>{format(m.createdAt)}</div>
							</div>
						))}
					</div>
					<div className='Messages__chatbox'>
						<div className='chatbox'>
							{pickerVisible ? (
								<Picker
									onEmojiClick={onEmojiClick}
									pickerStyle={{ position: 'absolute', bottom: '220px' }}
								/>
							) : (
								<></>
							)}

							<IconButton>
								<MoodIcon onClick={() => setPickerVisible(!pickerVisible)} />
							</IconButton>
							<input
								placeholder='type a message'
								value={text}
								onChange={(e) => setText(e.target.value)}
								onKeyDown={onEnterPress}
							/>
							<IconButton onClick={sendMsg}>
								<ArrowCircleUpIcon />
							</IconButton>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		activeChat: state.auth.activeChat,
	};
};

export default connect(mapStateToProps)(Messages);
