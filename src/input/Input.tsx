import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';

// extends Omit<React.HTMLAttributes<HTMLInputElement>, 'size'>
export interface InputProps {
	defaultValue?: string;
	value?: string;
	onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
	placeholder?: string;
	maxLength?: number;
	prefix?: ReactNode;
	size?: 'small' | 'medium' | 'large';
	className?: string;
	children?: ReactNode;
	style?: React.CSSProperties;
	status?: 'error' | 'warning';
}

const Input = (props: InputProps) => {
	const { size = 'medium', defaultValue, value: iValue, onChange, children, prefix, status, ...restProps } = props;
	const [value, setValue] = useState(defaultValue || iValue || '');

	useEffect(() => {
		if ('value' in props) {
			if (typeof iValue === 'undefined') {
				setValue('');
			} else {
				setValue(iValue);
			}
		}
	}, [props, iValue]);

	const cls = classNames('ant-input', {
		'ant-input-sm': size === 'small',
		'ant-input-lg': size === 'large',
		[`ant-input-status-${status}`]: status,
	});
	const wrapperCls = classNames('ant-input-affix-wrapper', {
		'ant-input-affix-wrapper-sm': size === 'small',
		'ant-input-affix-wrapper-lg': size === 'large',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!('value' in props)) {
			setValue(e.target.value);
		}
		onChange?.(e);
	};

	const input = <input className={cls} value={value} onChange={handleChange} {...restProps} />;

	if (props.maxLength || prefix) {
		return (
			<span className={wrapperCls}>
				{prefix ? <span className='ant-input-prefix'>{prefix}</span> : null}
				{input}
				{props.maxLength ? (
					<span className='ant-input-suffix'>
						<span className='ant-input-show-count-suffix'>
							{value.length} / {props.maxLength}
						</span>
					</span>
				) : null}
			</span>
		);
	}

	return input;
};

export default Input;
