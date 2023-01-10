import React, { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface itemProps extends React.HTMLAttributes<HTMLElement> {
	className?: string;
	icon?: ReactNode;
	children?: ReactNode;
	style?: CSSProperties;
}

const Item = (props: itemProps) => {
	const { className, icon, children, style, ...others } = props;

	const cls = classNames('ant-menu-item', className);

	const IconElement = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement, {
				className: 'ant-menu-item-icon',
		  })
		: null;

	return (
		<li className={cls} style={style} {...others}>
			{IconElement}
			<span className='ant-menu-title-content'>{children}</span>
		</li>
	);
};

export default Item;
