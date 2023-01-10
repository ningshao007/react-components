import React, { CSSProperties, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import MenuContext from './MenuContext';
import './index.scss';

export interface itemProps extends React.HTMLAttributes<HTMLElement> {
	className?: string;
	key?: string;
	id: string;
	icon?: ReactNode;
	children?: ReactNode;
	style?: CSSProperties;
}

const Item = (props: itemProps) => {
	const { className, icon, id, children, style, ...others } = props;
	const { level, inlineIndent, selectedKeys, onSelect } = useContext(MenuContext);

	const selected = selectedKeys?.indexOf(id) !== -1;

	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		e.stopPropagation();
		onSelect?.(id);
	};

	const cls = classNames('ant-menu-item', className, {
		'ant-menu-item-selected': selected,
	});

	const IconElement = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement, {
				className: 'ant-menu-item-icon',
		  })
		: null;

	const itemStyle = {
		paddingLeft: level * inlineIndent,
		...style,
	};

	return (
		<li className={cls} style={itemStyle} {...others} onClick={handleClick}>
			{IconElement}
			<span className='ant-menu-title-content'>{children}</span>
		</li>
	);
};

export default Item;
