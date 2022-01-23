import React, { useState } from 'react';
import { connect } from 'react-redux';
import defaultProfilePic from '../../photos/defaultProfilePic.jpg';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Axios from 'axios';
import PrivateMessage from '../common/PrivateMessage';
import Input from '../common/Input';
import axios from '../../axios';
import { changeProfile } from '../../actions/authActions';
import Error from '../common/Error';

function Profile(props) {
	const { user, changeProfile } = props;
	const [userData, setUserData] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);
	const [display, setDisplay] = useState(false);
	const [err, setErr] = useState('');

	const open = () => {
		setDisplay(true);
	};
	const close = () => {
		setUserData(user);
		setDisplay(false);
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleChangeImage = (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'xspjwajc');

		Axios.post(
			'https://api.cloudinary.com/v1_1/deegkopwn/image/upload',
			formData
		)
			.then((res) =>
				setUserData({
					...userData,
					profilePic: res.data.secure_url,
				})
			)
			.catch((err) =>
				setErr('Oops! Something wrong happened. Please try again later')
			);
	};

	const submitChange = (e) => {
		const newInfo = {
			username: userData.username.replace(/ /g, ''),
			email: userData.email,
			profilePic: userData.profilePic,
		};
		axios()
			.put(`/api/users/${userData._id}`, newInfo)
			.then((res) => {
				changeProfile(res.data);
				setUserData(res.data);
				setDisplay(false);
			})
			.catch((err) => setErr(err.response.data.message));
	};

	console.log('Profile ===> userData:', userData);
	console.log('Profile ===> localStorage:', localStorage.getItem('user'));

	return (
		<div className='profile'>
			{userData ? (
				<div>
					{display ? (
						<CancelIcon onClick={close} />
					) : (
						<EditIcon onClick={open} />
					)}

					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						{/* left-side */}
						{display ? (
							<div>
								<Input
									className={'input__username'}
									id={'username'}
									text={'Username'}
									value={userData.username}
									name='username'
									type='text'
									handleChange={handleChange}
								/>
								<Input
									className={'input__email'}
									id={'email'}
									text={'Email'}
									value={userData.email}
									name='email'
									type='email'
									handleChange={handleChange}
								/>
								<div>
									<label htmlFor='pic'>Choose a Photo</label>
									<input
										id='pic'
										type='file'
										accept='image/*'
										onChange={handleChangeImage}
									/>
								</div>
							</div>
						) : (
							<div className='profile__left'>
								<div>
									<span>Username:</span>
									<span>{userData.username}</span>
								</div>
								<span>Email:</span>
								<span>{userData.email}</span>
							</div>
						)}

						{/* right-side */}
						<div className='profile__right'>
							<img
								alt=''
								src={
									userData.profilePic ? userData.profilePic : defaultProfilePic
								}
								style={{ width: '300px', height: '300px' }}
							/>
						</div>
					</div>

					{display ? (
						<button onClick={submitChange}>Save Change</button>
					) : (
						<></>
					)}
					{err ? <Error error={err} setError={setErr} /> : <></>}
				</div>
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

export default connect(mapStateToProps, { changeProfile })(Profile);
