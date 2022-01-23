import React, { useState } from 'react'
import avt from '../../photos/avt.jpg'
import MoodIcon from '@mui/icons-material/Mood'
import { IconButton } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import Picker from 'emoji-picker-react'

function Conversations(props) {
    const [isYours, setIsYours] = useState(true)
    const [text, setText] = useState('')
    const [pickerVisible, setPickerVisible] = useState(false)
    const [messageList, setMessageList] = useState(props.messagesList)

    console.log(pickerVisible)

    const onEmojiClick = (e, emojiObj) => {
        setText(text + emojiObj.emoji)
        setPickerVisible(false)
    }

    const send = () => {
        const messages = [...messageList]
        messages.push(
            {
                id: 0,
                messageType: "TEXT",
                text: text,
                senderID: 1,
                addedOn: "9:00 PM",
            },
        )
        setMessageList(messages)
        setText('')
    }

    const onEnterPress = e => {
        if (e.key === 'Enter') {
            send()
        }
    }

    const sendMsg = e => {
        e.preventDefault()
        send()
    }

    return (
        <div className='conversations'>
            <div className="converstations__profileHeader">
                <img src={avt} alt='' />
                <div className="converstations__senderName">{props.selectedChat.name}</div>
            </div>

            <div className="conversations__messageContainer">
                {messageList.map((msg, idx) => (
                    <div className={`message-wrapper${msg.senderID === 0 ? '' : ' message-wrapper__receiver'}`}>
                        <div className="message">{msg.text}</div>
                    </div>
                ))}

            </div>

            <div className="conversations__chatbox">
                <div className="chatbox">
                    {pickerVisible
                        ? <Picker
                            onEmojiClick={onEmojiClick}
                            pickerStyle={{ position: 'absolute', bottom: '220px' }}
                        />
                        : <></>
                    }

                    <IconButton>
                        <MoodIcon onClick={() => setPickerVisible(!pickerVisible)} />
                    </IconButton>
                    <input
                        placeholder='type a message'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={onEnterPress}
                    />
                    <IconButton onClick={sendMsg} >
                        <ArrowCircleUpIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Conversations
