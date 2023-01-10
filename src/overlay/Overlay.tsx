import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export interface overlayProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	hasMask?: boolean;
	visible?: boolean;
	onVisibleChange?: (e: boolean) => void;
	style?: CSSProperties;
}

const Overlay = (props: overlayProps) => {
	const { className, children, style, hasMask, visible: pVisible, onVisibleChange, ...others } = props;
	const [visible, setVisible] = useState(pVisible || false);

	const content = ReactDOM.createPortal(children, document.body);

	useEffect(() => {
		if ('visible' in props) {
			setVisible(pVisible!);
		}
	}, [pVisible, props]);

	useEffect(() => {
		function handleMouseDown(e: MouseEvent) {
			onVisibleChange?.(false);
		}

		if (visible) {
			window.addEventListener('mousedown', handleMouseDown, false);
		}

		return () => {
			window.removeEventListener('mousedown', handleMouseDown, false);
		};
	}, [onVisibleChange, visible]);

	if (!visible) {
		return null;
	}

	return (
		<div>
			{hasMask ? <div /> : null}
			{content}
		</div>
	);
};

export default Overlay;
