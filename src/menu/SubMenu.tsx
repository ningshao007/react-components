import React, { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface SubMenuProps {
	className?: string;
	icon?: ReactNode;
	title?: ReactNode;
	children?: ReactNode;
	style?: CSSProperties;
}

const SubMenu = (props: SubMenuProps) => {
	const { className, icon, title, children, style, ...others } = props;

	const cls = classNames('ant-menu-submenu', 'ant-menu-submenu-inline', 'ant-menu-submenu-open', 'ant-menu-submenu-selected', className);

	const IconElement = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement, {
				className: 'ant-menu-item-icon',
		  })
		: null;

	return (
		<li className={cls} style={style} {...others}>
			<div className='ant-menu-submenu-title'>
				{IconElement}
				<span className='ant-menu-title-content'>{title}</span>
				<i className='ant-menu-submenu-arrow' />
			</div>
			<div className='ant-menu ant-menu-sub ant-menu-inline'>{children}</div>
		</li>
	);
};

export default SubMenu;
