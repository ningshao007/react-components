import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';

export interface radioProps extends React.HTMLAttributes<HTMLInputElement> {
	value?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

const Radio = (props: radioProps) => {
	const { disabled, className, children, style, onChange, value, ...restProps } = props;
	const [checked, setChecked] = useState(false);
	const inputEl = useRef(null);

	const cls = classNames('ant-radio', {
		'ant-radio-checked': checked,
		'ant-radio-disabled': disabled,
	});
	const wrapperCls = classNames('ant-radio-wrapper', {
		'ant-radio-wrapper-disabled': disabled,
	});

	React.useEffect(() => {
		if ('checked' in props && props.checked !== checked) {
			setChecked(props.checked!);
		}
	}, [checked, props, props.checked]);

	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
		if (disabled || checked) return;
		if (!('checked' in props)) setChecked(true);
		if (typeof onChange === 'function') {
			e.target = inputEl.current!;
			onChange(e);
		}
	};

	return (
		<span className={wrapperCls} onClick={handleClick}>
			<span className={cls}>
				<input type='radio' className='ant-radio-input' value={value} ref={inputEl} {...restProps} id='radio' />
				<span className='ant-radio-inner'></span>
			</span>
			<label htmlFor='radio'>{children}</label>
		</span>
	);
};

export default Radio;
