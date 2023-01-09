import React, { useState } from 'react';
import classNames from 'classnames';
import Radio, { RadioProps } from './Radio';
import './index.scss';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLInputElement> {
	value?: string;
	defaultValue?: string;
	onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

const RadioGroup = (props: RadioGroupProps) => {
	const { disabled, children, style, onChange } = props;
	const [value, setValue] = useState(props.defaultValue || props.value);

	const cls = classNames('ant-radio-group');

	const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		setValue(value);
		onChange?.(e);
	};

	const newChildren = React.Children.map(children, (child) => {
		const childElement = child as React.FunctionComponentElement<RadioProps>;
		if (childElement.type !== Radio) {
			return null;
		}

		return React.cloneElement(childElement, {
			checked: childElement.props.value === value,
			disabled: disabled,
			onChange: handleClick,
		});
	});

	return (
		<span className={cls} style={style}>
			{newChildren}
		</span>
	);
};

export default RadioGroup;
