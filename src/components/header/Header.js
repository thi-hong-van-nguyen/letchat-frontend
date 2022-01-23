import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import defaultProfilePic from '../../photos/defaultProfilePic.jpg';

function Header(props) {
	const { user } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	console.log(
		'Header renders, user: ',
		user,
		'localstorage: ',
		localStorage.getItem('user')
	);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		navigate('/logout');
	};

	const handleClickProfile = () => {
		setAnchorEl(null);
		navigate(`/profile/${user._id}`);
	};

	return (
		<div className='header'>
			<div className='logo'>logo</div>
			<div
				className='nagivations'
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
					border: 'solid red 1px',
				}}
			>
				<Link to='/home'>Home</Link>
				<Link to='/chat-rooms'>Chat Rooms</Link>
				{user ? (
					<div>
						<img
							style={{ width: '100px', height: '100px' }}
							src={user.profilePic ? user.profilePic : defaultProfilePic}
							onClick={handleClick}
							alt=''
						/>
					</div>
				) : (
					<>
						<Link to='/register'>Sign up</Link>
						<Link to='/login'>Log in</Link>
					</>
				)}
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={handleClickProfile}>Profile</MenuItem>
					<MenuItem onClick={handleLogout}>Log out</MenuItem>
				</Menu>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Header);
