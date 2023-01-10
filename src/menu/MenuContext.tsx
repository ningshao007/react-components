import { createContext } from 'react';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';

export interface MenuContextProps {
	mode: MenuMode;
	inlineIndent: number;
	level: number;
	selectedKeys?: string[];
	openKeys?: string[];
	onSelect?: Function;
	onOpenChange?: (key: string) => void;
	onClick?: () => void;
}

export default createContext<MenuContextProps>({
	level: 0,
	mode: 'vertical',
	inlineIndent: 24,
});
