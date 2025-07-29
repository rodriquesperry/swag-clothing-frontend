import { InputHTMLAttributes } from 'react';
import './form_input.styles.scss';

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
	return (
		<div className='group'>
			<input className='form-input' {...otherProps} />
			{label && (
				<label
					className={`${
						otherProps.value && otherProps.value.toString().length ? 'shrink' : ''
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
