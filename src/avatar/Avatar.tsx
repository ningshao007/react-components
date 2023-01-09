import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface avatarProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: number | 'small' | 'medium' | 'large';
	shape?: 'circle' | 'square';
	src?: string | React.ReactNode;
	className?: string;
	icon?: React.ReactNode;
	gap?: number;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

const Avatar = (props: avatarProps) => {
	const { size = 'medium', shape = 'circle', src, icon, gap, children, ...others } = props;
	const [scale, setScale] = useState(1);
	const wrapperRef = useRef<HTMLSpanElement>(null);

	// ππ: 注意这里的实现
	const textRefCallback = useCallback((node: HTMLSpanElement) => {
		if (!node) return;

		const render = () => {
			const wrapperNode = wrapperRef.current;

			if (!node || !wrapperNode) return;

			const wrapperWidth = wrapperNode.offsetWidth;
			const textWidth = node.offsetWidth;
			const gap = 4;
			const scale = wrapperWidth - gap * 2 < textWidth ? (wrapperWidth - gap * 2) / textWidth : 1;

			setScale(scale);
		};

		const ob = new ResizeObserver(render);
		ob.observe(node);
	}, []);

	const cls = classNames('ant-avatar', {
		'ant-avatar-sm': size === 'small',
		'ant-avatar-lg': size === 'large',
		'ant-avatar-icon': icon,
		'ant-avatar-image': src,
		[`ant-avatar-${shape}`]: shape,
	});

	const style =
		typeof size === 'number'
			? {
					width: size,
					height: size,
					lineHeight: `${size}px`,
					fontSize: size / 2,
			  }
			: props.style;
	const textStyle = {
		lineHeight: `${size}px`,
		transform: `scale(${scale}) translateX(-50%)`,
	};

	return (
		<span className={cls} style={style} ref={wrapperRef} {...others}>
			{icon ? icon : null}
			{src ? typeof src === 'string' ? <img src={src} alt='' /> : src : null}
			{children ? (
				typeof children === 'string' ? (
					<span style={textStyle} ref={textRefCallback} className='ant-avatar-string'>
						{children}
					</span>
				) : (
					children
				)
			) : null}
		</span>
	);
};

export default Avatar;
