import axios from 'axios';

const instance = () => {
	return axios.create({
		baseURL: 'https://letchat-backend.herokuapp.com',
	});
};

export default instance;
