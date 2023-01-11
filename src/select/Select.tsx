import React, { CSSProperties, ReactElement, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import Popup from '../overlay/Popup';
import Menu from '../menu';
import './index.scss';
import { itemProps } from '../menu/Item';

export interface selectProps {
	className?: string;
	defaultValue?: string;
	value?: string;
	onChange?: (key: string) => void;
	children?: ReactNode;
	showArrow?: boolean;
	style?: CSSProperties;
	multiple?: boolean;
}
interface detailProps extends selectProps {
	title?: ReactElement;
}

const Select = (props: selectProps) => {
	const { children, multiple, style, showArrow, defaultValue, value: pValue, onChange } = props;
	const [value, setValue] = useState(defaultValue || pValue || '');
	const [detailValue, setDetailValue] = useState<detailProps>({});

	let options: (selectProps & { title: ReactElement })[] = [];

	const content = React.Children.map(children, (child) => {
		const childElement = child as React.FunctionComponentElement<itemProps>;

		if (childElement.type !== Menu.Item) {
			return;
		}

		options.push({
			...childElement.props,
			// @ts-ignore
			title: childElement.props.children,
		});

		return <Menu.Item {...childElement.props} key={value} id={value} />;
	});

	const cls = classNames('ant-select', {
		'ant-select-single': !multiple,
		'ant-select-show-arrow': showArrow,
	});

	const trigger = (
		<div className={cls} style={style}>
			<div className='ant-select-selector'>
				<span className='ant-select-selection-search'>
					<input type='search' autoComplete='off' className='ant-select-selection-search-input' unselectable='on' />
				</span>
				{/* @ts-ignore */}
				<span className='ant-select-selection-item' title={detailValue?.title}>
					{detailValue?.title}
				</span>
				<span className='ant-select-arrow' unselectable='on'>
					✅
				</span>
			</div>
		</div>
	);

	const handleSelect = (keys: string[]) => {
		const key = keys[0];
		if (key) {
			const item = options.find((i) => i.value === key);

			if (item) {
				setDetailValue(item);
			}
			setValue(key);
			onChange?.(key);
		}
	};

	return (
		<Popup triggerType='click' placement='bottomLeft' className={cls} style={style} trigger={trigger}>
			<Menu mode='inline' onSelect={handleSelect}>
				{content}
			</Menu>
		</Popup>
	);
};

export default Select;
