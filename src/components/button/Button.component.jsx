import React from 'react';
import './button.styles.scss';
import { BUTTON_TYPE_CLASSES } from './button.types';


const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<div>
			<button
				className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
				{...otherProps}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
