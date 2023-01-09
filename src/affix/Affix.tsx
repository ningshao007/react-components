import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface affixProps extends React.HTMLAttributes<HTMLDivElement> {
	offsetTop?: number;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

const Affix = (props: affixProps) => {
	const { className, children, style, offsetTop = 0, ...others } = props;
	const [wrapperStyle, setWrapperStyle] = useState<{ height?: number; width?: number }>({});
	const [affixed, setAffixed] = useState(false);

	const wrapperRefCB = useCallback(
		(node: HTMLDivElement) => {
			if (!node) return;

			function updatePosition() {
				const { top, width, height } = node.getBoundingClientRect();
				if ((top <= offsetTop && !affixed) || (affixed && width !== wrapperStyle.width) || height !== wrapperStyle.height) {
					setWrapperStyle({ width, height });
					setAffixed(true);
				} else if (top > offsetTop) {
					setAffixed(false);
				}
			}

			window.addEventListener('scroll', updatePosition, false);

			const ob = new ResizeObserver(updatePosition);
			ob.observe(node);
		},
		[affixed, offsetTop, wrapperStyle.height, wrapperStyle.width],
	);

	const cls = classNames('ant-affix', className);

	return (
		<div ref={wrapperRefCB} {...others}>
			{affixed ? <div style={wrapperStyle} /> : null}
			<div className={cls} style={affixed ? { position: 'fixed', top: offsetTop, ...wrapperStyle } : undefined}>
				{children}
			</div>
		</div>
	);
};

export default Affix;
