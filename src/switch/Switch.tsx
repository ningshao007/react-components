import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface switchProps {
	className?: string;
	defaultChecked?: boolean;
	checked?: boolean;
	disabled?: boolean;
	onChange?: (e: boolean) => void;
	checkedChildren?: React.ReactNode;
	unCheckedChildren?: React.ReactNode;
	size?: 'small' | 'medium';
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

const Switch = (props: switchProps) => {
	const { className, disabled, defaultChecked, checked, checkedChildren, children, style, unCheckedChildren, onChange, ...others } = props;
	const [isChecked, setIsChecked] = useState(defaultChecked || checked || false);

	useEffect(() => {
		if ('checked' in props) {
			setIsChecked(checked!);
		}
	}, [checked, props]);

	const handleClick = () => {
		if (!('checked' in props)) {
			setIsChecked(!isChecked);
		}

		onChange?.(!isChecked);
	};

	const cls = classNames('ant-switch', className, {
		'ant-switch-checked': isChecked,
		'ant-switch-disabled': disabled,
	});

	return (
		<button type='button' role='switch' aria-checked='true' className={cls} onClick={handleClick} {...others}>
			<div className='ant-switch-handle'></div>
			<span className='ant-switch-inner'>{isChecked ? checkedChildren : unCheckedChildren}</span>
		</button>
	);
};

export default Switch;
