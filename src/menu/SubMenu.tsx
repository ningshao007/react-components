import React, { CSSProperties, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import './index.scss';
import MenuContext from './MenuContext';

export interface SubMenuProps {
	className?: string;
	icon?: ReactNode;
	title?: ReactNode;
	children?: ReactNode;
	style?: CSSProperties;
	id: string;
}

const SubMenu = (props: SubMenuProps) => {
	const { className, icon, title, children, style, id, ...others } = props;
	const { level, inlineIndent, mode, selectedKeys, openKeys, onOpenChange, ...otherContext } = useContext(MenuContext);

	const isOpen = openKeys?.indexOf(id) !== -1;

	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		e.stopPropagation();
		onOpenChange?.(id);
	};

	const isChildSelected = (nodes: React.ReactNode): boolean => {
		return React.Children.toArray(nodes).some((item) => {
			if (!React.isValidElement(item)) {
				return false;
			}

			const { id, children } = item.props;

			if (Array.isArray(children) && children.length) {
				return isChildSelected(children);
			}

			return selectedKeys?.indexOf(id) !== -1;
		});
	};

	const isSelected = isChildSelected(children);

	const cls = classNames('ant-menu-submenu', className, {
		[`ant-menu-submenu-${mode}`]: true,
		'ant-menu-submenu-open': isOpen,
		'ant-menu-submenu-selected': isSelected,
	});
	const subCls = classNames('ant-menu', 'ant-menu-sub', {
		'ant-menu-hidden': !isOpen,
		[`ant-menu-${mode}`]: true,
	});
	const itemStyle = {
		paddingLeft: level * inlineIndent,
	};

	const IconElement = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement, {
				className: 'ant-menu-item-icon',
		  })
		: null;

	return (
		<MenuContext.Provider value={{ inlineIndent, mode, level: level + 1, openKeys, selectedKeys, onOpenChange, ...otherContext }}>
			<li className={cls} style={style} {...others} onClick={handleClick}>
				<div className='ant-menu-submenu-title' style={itemStyle}>
					{IconElement}
					<span className='ant-menu-title-content'>{title}</span>
					<i className='ant-menu-submenu-arrow' />
				</div>
				<div className={subCls}>{children}</div>
			</li>
		</MenuContext.Provider>
	);
};

export default SubMenu;
