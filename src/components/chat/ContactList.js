import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import defaultProfilePic from '../../photos/defaultProfilePic.jpg';
import { connect } from 'react-redux';

function ContactListContainer(props) {
	const { user } = props;

	console.log(props.contactList);
	console.log('CONTACTLIST renders ======>', user);
	return (
		<div className='contact-list'>
			{/* USER PIC */}
			<div className='contact-list__profile'>
				<img
					src={user.profilePic ? user.profilePic : defaultProfilePic}
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
				{props.contactList.map((userData, idx) => (
					<div
						className='contact-item'
						key={idx}
						onClick={() => props.setChat(userData)}
					>
						<div className='contact-item__img'>
							<img src={userData.profilePic} alt='' />
						</div>
						<div className='contact-item__content'>
							<span className='contact-item__content--line1'>
								{userData.name}
							</span>
							<span className='contact-item__content--line2'>
								{userData.lastText}
							</span>
						</div>
						<div className='contact-item__timestamp'>
							{userData.lastTextTime}
						</div>
					</div>
				))}
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
