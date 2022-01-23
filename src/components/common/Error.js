import React, { useEffect } from 'react';

function Error(props) {
	useEffect(() => {
		setTimeout(() => props.setError(''), 2000);
	}, []);

	return (
		<div className='error' style={{ color: 'red' }}>
			{props.error}
		</div>
	);
}

export default Error;
