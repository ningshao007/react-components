import React, { ReactNode, CSSProperties, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface affixProps extends React.HTMLAttributes<HTMLDivElement> {
	offsetTop?: number;
	className?: string;
	children?: ReactNode;
	style?: CSSProperties;
}

const Affix = (props: affixProps) => {
	const { className, children, style, offsetTop = 0, ...others } = props;
	const [wrapperStyle, setWrapperStyle] = useState({});
	const [affixed, setAffixed] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const fixedRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const wrapperNode = wrapperRef.current;

		if (!wrapperNode) {
			return;
		}

		function updatePosition() {
			if (!wrapperRef.current) return;

			const { top, width, height } = wrapperRef.current.getBoundingClientRect();

			if (top <= offsetTop && !affixed) {
				setWrapperStyle({
					width,
					height,
				});
				setAffixed(true);
			} else if (top > offsetTop) {
				setAffixed(false);
			}
		}

		window.addEventListener('scroll', updatePosition, false);

		return () => {
			window.removeEventListener('scroll', updatePosition, false);
		};
	}, [affixed, offsetTop]);

	const cls = classNames('ant-affix', className);

	return (
		<div ref={wrapperRef} {...others}>
			{affixed ? <div style={wrapperStyle} /> : null}
			<div
				style={
					affixed
						? {
								top: offsetTop,
								...wrapperStyle,
						  }
						: undefined
				}
				ref={fixedRef}
				className={cls}>
				{children}
			</div>
		</div>
	);
};

export default Affix;
