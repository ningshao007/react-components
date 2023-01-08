import React from 'react';
import classNames from 'classnames';

import './index.scss';

interface buttonProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string;
	type?: 'normal' | 'primary' | 'dashed' | 'link' | 'text';
	size?: 'small' | 'medium' | 'large';
	children: React.ReactNode;
	style?: React.CSSProperties;
	onClick?: () => void;
	onBlur?: () => void;
	htmlType?: 'button' | 'submit' | 'reset';
}

const Button = (props: buttonProps) => {
	const { className, type = 'normal', size = 'medium', children, style, onClick, onBlur, htmlType = 'button', ...others } = props;

	const cls = classNames('ant-btn', className, {
		[`ant-btn-${size}`]: size,
		[`ant-btn-${type}`]: type,
	});

	return (
		<button type={htmlType} className={cls} style={style} onClick={onClick} onBlur={onBlur} {...others}>
			{children}
		</button>
	);
};

export default Button;
