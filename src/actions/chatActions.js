export const ACTIVE_CHAT = 'ACTIVE_CHAT';

export const getActiveChat = (conversation) => (dispatch) => {
	dispatch({ type: ACTIVE_CHAT, payload: conversation });
};
