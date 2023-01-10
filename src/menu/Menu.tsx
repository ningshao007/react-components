import React, { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface menuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string;
	mode?: 'vertical' | 'horizontal' | 'inline';
	theme?: 'light' | 'dark';
	defaultSelectedKeys?: string[];
	children?: ReactNode;
	style?: CSSProperties;
}

const Menu = (props: menuProps) => {
	const { className, children, style, mode = 'vertical', theme = 'light', ...others } = props;

	const cls = classNames('ant-menu', 'ant-menu-root', className, {
		[`ant-menu-${mode}`]: true,
		[`ant-menu-${theme}`]: true,
	});

	return (
		<ul className={cls} style={style} {...others}>
			{children}
		</ul>
	);
};

export default Menu;
