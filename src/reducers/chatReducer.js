import { ACTIVE_CHAT } from '../actions/chatActions';

const init = null;

const chatReducer = (state = init, action) => {
	switch (action.type) {
		case ACTIVE_CHAT:
			return action.payload;
		default:
			return state;
	}
};

export default chatReducer;
