import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

interface tagProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string;
	closable?: boolean;
	color?: string;
	visible?: boolean;
	onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Tag = (props: tagProps) => {
	const { className, children, closable, color, onClose, style, ...restProps } = props;
	const [visible, setVisible] = useState(true);

	const customColor = color && color.match(/^#/);
	const cls = classNames('ant-tag', className, {
		[`ant-tag-${color}`]: color && !customColor,
	});

	useEffect(() => {
		if ('visible' in props && typeof props.visible !== 'undefined') {
			setVisible(props.visible);
		}
	}, [props, props.visible]);

	const tStyle: React.CSSProperties = { ...style };

	if (customColor) {
		tStyle.backgroundColor = color;
	}
	if (!visible) {
		return null;
	}

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		typeof onClose === 'function' && onClose(e);

		if (e.defaultPrevented) {
			return;
		}
		if (!('visible' in props)) {
			setVisible(false);
		}
	};

	return (
		<span className={cls} style={style} {...restProps}>
			{children}{' '}
			{closable ? (
				<span onClick={handleClick} style={{ cursor: 'pointer' }}>
					x
				</span>
			) : null}
		</span>
	);
};

export default Tag;
