import { ReactNode, CSSProperties, useContext } from 'react';
import FormContext from './FormContext';

import Button from '../button';

export interface formProps {
	className?: string;
	children?: ReactNode;
	style?: CSSProperties;
	resetValue?: Record<string, any>;
}

const Reset = (props: formProps) => {
	const { children, resetValue = {}, ...others } = props;

	const { setValues } = useContext(FormContext);

	return (
		<Button
			{...others}
			onClick={() => {
				setValues?.(resetValue);
			}}>
			{children}
		</Button>
	);
};

export default Reset;
