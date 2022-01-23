import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import defaultProfilePic from '../../photos/defaultProfilePic.jpg';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from '../../axios';
import Axios from 'axios';
import Error from '../common/Error';
import { changeProfile, updateLoginCall } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

function Draft(props) {
	const { user, changeProfile } = props;
	const [displayEdit, setDisplayEdit] = useState(false);
	const [userData, setUserData] = useState(null);
	const [err, setErr] = useState('');
	const [img, setImg] = useState('');
	const navigate = useNavigate();

	// console.log('Profile renders, user: ', user);

	const storedUser = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (storedUser) {
			axios()
				.get(`/api/users/${storedUser._id}`)
				.then((res) => {
					setUserData(res.data);
				})
				.catch((err) => navigate('/logout'));
		}
	}, []);

	const changeUserInfo = (newInfo) => {
		return axios()
			.put(`/api/users/${userData._id}`, newInfo)
			.then((res) => {
				changeProfile(res.data);
				setUserData(res.data);
				setDisplayEdit(false);
			})
			.catch((err) => setErr(err.response.data.message));
	};

	const handleClose = () => {
		setDisplayEdit(false);
		setUserData(user);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleImageChange = (e) => {
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

	console.log('USERDATA', userData);

	const submitChangeInfo = (e) => {
		e.preventDefault();
		const newInfo = {
			username: userData.username.replace(/ /g, ''),
			email: userData.email,
			profilePic: userData.profilePic,
		};
		changeUserInfo(newInfo);
	};

	const submitImage = () => {
		const newInfo = {
			username: userData.username.replace(/ /g, ''),
			email: userData.email,
			profilePic: userData.profilePic,
		};
		changeUserInfo(newInfo);
	};

	console.log(img);

	return (
		<div>
			{!userData ? (
				<h1>...Loading</h1>
			) : (
				<>
					<div>
						<div className='profile__left'>
							{displayEdit ? (
								<>
									<CancelIcon onClick={handleClose} />
									<form onSubmit={submitChangeInfo}>
										<input
											name='username'
											value={userData.username}
											onChange={handleChange}
											type='text'
										/>
										<input
											name='email'
											value={userData.email}
											onChange={handleChange}
											type='email'
										/>
										<button type='submit'>Save Change</button>
									</form>
								</>
							) : (
								<>
									<EditIcon onClick={() => setDisplayEdit(true)} />
									<div>
										<span>Username:</span>
										<span>{user.username}</span>
									</div>
									<div>
										<span>Email:</span>
										<span>{user.email}</span>
									</div>
								</>
							)}
						</div>
						<div className='profile__right'>
							<img
								style={{ width: '200px', height: '200px' }}
								src={
									user && user.profilePic ? user.profilePic : defaultProfilePic
								}
								alt=''
							/>
							<label>
								Change Photo
								<input
									type='file'
									name='profilePic'
									accept='image/*'
									onChange={handleImageChange}
								/>
							</label>
							<button onClick={submitImage}>Save change</button>
						</div>
					</div>
					{err ? <Error error={err} setError={setErr} /> : <></>}
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { changeProfile })(Draft);
