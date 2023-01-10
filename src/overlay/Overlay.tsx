import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import getPlacement, { PlacementType, PointsType } from './placement';

export interface overlayProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: React.ReactElement;
	hasMask?: boolean;
	visible?: boolean;
	onVisibleChange?: (e: boolean) => void;
	style?: CSSProperties;
	target?: HTMLElement | (() => HTMLElement);
	points?: PointsType;
	placement?: PlacementType;
	beforePosition?: Function;
}

const Overlay = (props: overlayProps) => {
	const { className, children, style, hasMask, visible: pVisible, target, onVisibleChange, points, placement, beforePosition, ...others } = props;
	const [visible, setVisible] = useState(pVisible || false);
	const [positionStyle, setPositionStyle] = useState({});
	const overlayRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if ('visible' in props) {
			setVisible(pVisible!);
		}
	}, [pVisible, props]);

	useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			const safeNodeList: Node[] = [];
			const clickNode = e.target as Node;

			if (overlayRef.current) {
				safeNodeList.push(overlayRef.current);
			}

			for (let i = 0; i < safeNodeList.length; i++) {
				const node = safeNodeList[i];
				if (node && node.contains(clickNode)) {
					return;
				}
			}

			onVisibleChange?.(false);
		};

		window.addEventListener('mousedown', handleMouseDown);

		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
		};
	}, [onVisibleChange]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!visible || !overlayRef.current) {
				return;
			}
			if (e.key === 'Escape') {
				onVisibleChange?.(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onVisibleChange, visible]);

	const overlayRefCallback = useCallback(
		(node: HTMLElement) => {
			if (!node) return;

			overlayRef.current = node;

			if (node && target) {
				const targetElement = typeof target === 'function' ? target() : target;
				const positionStyle = getPlacement({
					target: targetElement,
					overlay: node,
					points,
					placement,
					beforePosition,
				});

				setPositionStyle(positionStyle);
			}
		},
		[beforePosition, placement, points, target],
	);

	const child = React.Children.only(children)!;

	const newChildren = React.cloneElement(child, {
		...others,
		ref: overlayRefCallback,
		style: { ...child?.props?.style, ...positionStyle },
	});

	if (!visible) {
		return null;
	}

	return ReactDOM.createPortal(
		<div>
			{hasMask ? <div /> : null}
			{newChildren}
		</div>,
		document.body,
	);
};

export default Overlay;
