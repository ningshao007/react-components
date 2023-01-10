import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import MenuContext, { MenuMode } from './MenuContext';

export interface menuProps {
	className?: string;
	mode?: MenuMode;
	theme?: 'light' | 'dark';
	defaultSelectedKeys?: string[];
	selectedKey?: string[];
	defaultOpenKeys?: string[];
	openKeys?: string[];
	inlineIndent?: number;
	onSelect?: (key: string[]) => void;
	multiple?: boolean;
	children?: ReactNode;
	style?: CSSProperties;
}

const Menu = (props: menuProps) => {
	const {
		className,
		children,
		style,
		mode = 'vertical',
		theme = 'light',
		defaultSelectedKeys,
		selectedKey: pSelectedKeys,
		defaultOpenKeys,
		openKeys: pOpenKeys,
		inlineIndent = 24,
		multiple = false,
		onSelect,
		...others
	} = props;
	const [selectedKeys, setSelectedKeys] = useState(pSelectedKeys || defaultSelectedKeys || []);
	const [openKeys, setOpenKeys] = useState(pOpenKeys || defaultOpenKeys || []);

	useEffect(() => {
		if (pSelectedKeys) {
			setSelectedKeys(pSelectedKeys);
		}
	}, [pSelectedKeys]);
	useEffect(() => {
		if (pOpenKeys) {
			setSelectedKeys(pOpenKeys);
		}
	}, [pOpenKeys]);

	const handleOpenChange = (key: string) => {
		const newOpenKeys = [...openKeys];

		if (openKeys.indexOf(key) === -1) {
			newOpenKeys.push(key);
		} else {
			newOpenKeys.splice(openKeys.indexOf(key), 1);
		}

		setOpenKeys(newOpenKeys);
	};

	const handleSelect = (key: string) => {
		if (multiple) {
		} else {
			setSelectedKeys([key]);
			onSelect?.([key]);
		}
	};

	const cls = classNames('ant-menu', 'ant-menu-root', className, {
		[`ant-menu-${mode}`]: true,
		[`ant-menu-${theme}`]: true,
	});

	return (
		<MenuContext.Provider
			value={{
				inlineIndent,
				mode,
				level: 1,
				selectedKeys,
				openKeys,
				onSelect: handleSelect,
				onOpenChange: handleOpenChange,
			}}>
			<ul className={cls} style={style} {...others}>
				{children}
			</ul>
		</MenuContext.Provider>
	);
};

export default Menu;
