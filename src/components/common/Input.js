import React from 'react';

function Input(props) {
	const { className, id, text, type, value, name, handleChange } = props;
	return (
		<div className={className}>
			<label htmlFor={id}>{text}</label>
			<input
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default Input;
