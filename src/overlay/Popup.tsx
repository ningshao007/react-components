import React, { ReactElement, useCallback, useRef, cloneElement, useState } from 'react';
import Overlay, { overlayProps } from './Overlay';
import { PlacementType } from './placement';

export interface popupProps extends Omit<overlayProps, 'children'> {
	trigger: ReactElement;
	children: ReactElement | string;
	placement?: PlacementType;
	triggerType?: 'hover' | 'click';
}

const Popup = (props: popupProps) => {
	const { placement = 'bottomLeft', trigger, triggerType = 'click', children, ...others } = props;
	const [visible, setVisible] = useState(false);
	const triggerRef = useRef<HTMLElement | null>(null);
	const mouseEnterTimer = useRef<NodeJS.Timeout | null>(null);
	const mouseOutTimer = useRef<NodeJS.Timeout | null>(null);

	const triggerRefCallback = useCallback((node: HTMLElement) => {
		triggerRef.current = node;
	}, []);

	const handleMouseEnter = () => {
		if (mouseOutTimer.current) {
			clearTimeout(mouseOutTimer.current);
			mouseOutTimer.current = null;
		}
		if (!mouseEnterTimer.current && !visible) {
			mouseEnterTimer.current = setTimeout(() => {
				setVisible(true);
			}, 100);
		}
	};

	const handleMouseLeave = () => {
		if (mouseEnterTimer.current) {
			clearTimeout(mouseEnterTimer.current);
			mouseEnterTimer.current = null;
		}
		if (!mouseOutTimer.current && visible) {
			mouseOutTimer.current = setTimeout(() => {
				setVisible(false);
			}, 100);
		}
	};

	const overlayProps: any = {};
	const triggerProps = {
		ref: triggerRefCallback,
	} as any;
	if (triggerType === 'hover') {
		triggerProps.onMouseEnter = handleMouseEnter;
		triggerProps.onMouseLeave = handleMouseLeave;
		overlayProps.onMouseEnter = handleMouseEnter;
		overlayProps.onMouseLeave = handleMouseLeave;
	} else {
		triggerProps.onClick = () => setVisible(true);
	}

	const handleVisibleChange = (visible: boolean) => {
		setVisible(visible);
	};

	const triggerEle = typeof trigger === 'string' ? <span>{trigger}</span> : trigger;

	const triggerNode = cloneElement(triggerEle, triggerProps);

	return (
		<>
			{triggerNode}
			<Overlay {...others} {...overlayProps} placement={placement} target={() => triggerRef.current} visible={visible} onVisibleChange={handleVisibleChange}>
				{typeof children === 'string' ? <div style={{ border: '1px solid #999' }}>{children}</div> : children}
			</Overlay>
		</>
	);
};

export default Popup;
