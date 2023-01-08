import React from 'react';
import classNames from 'classnames';

import './index.scss';

interface BaseProps {
	className?: string;
	type?: 'normal' | 'primary' | 'dashed' | 'link' | 'text';
	size?: 'small' | 'medium' | 'large';
	children: React.ReactNode;
	style?: React.CSSProperties;
	htmlType?: 'button' | 'submit' | 'reset';
	href?: string;
	disabled?: boolean;
}
type NativeButtonProps = BaseProps & React.HTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseProps & React.HTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button = (props: ButtonProps) => {
	const { className, type = 'normal', size = 'medium', children, style, htmlType = 'button', href, disabled, ...restProps } = props;

	const cls = classNames('ant-btn', className, {
		[`ant-btn-${size}`]: size,
		[`ant-btn-${type}`]: type,
		disabled: type === 'link' && disabled,
	});

	if (type === 'link' && href) {
		return (
			<a className={cls} style={style} href={href} {...restProps}>
				{children}
			</a>
		);
	} else {
		return (
			<button type={htmlType} className={cls} style={style} {...restProps}>
				{children}
			</button>
		);
	}
};

export default Button;
