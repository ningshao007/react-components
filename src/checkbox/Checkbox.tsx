import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.scss';
import { checkboxContext } from './context';

export interface CheckboxProps {
	prefixCls?: string;
	defaultChecked?: boolean;
	checked?: boolean;
	disabled?: boolean;
	value?: string;
	onChange?: (e: any) => void;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

export interface CheckboxChangeEventTarget {
	value: string;
	checked: boolean;
}

export interface CheckboxChangeEvent {
	target: CheckboxChangeEventTarget;
}

const Checkbox = (props: CheckboxProps) => {
	const { prefixCls = 'ant-', onChange, disabled, children, value, ...restProps } = props;
	const [checked, setChecked] = useState(props.defaultChecked || false);
	const inputEl = useRef(null);
	const { onChange: conChange, disabled: cdisabled, value: cValue } = useContext(checkboxContext);
	console.log('conChange', conChange, cdisabled, cValue);

	useEffect(() => {
		if ('checked' in props) {
			setChecked(props.checked || false);
		}
	}, [props, props.checked]);
	useEffect(() => {
		if (cValue && 'value' in props) {
			setChecked(cValue.indexOf(props.value!) > -1);
		}
	}, [cValue, props]);

	const handleClick = (e: any) => {
		if (disabled || cdisabled) return;
		if (!('checked' in props)) {
			setChecked(!checked);
		}
		if (typeof onChange === 'function') {
			e.target = inputEl.current;
			e.target.checked = !checked;
			onChange(e);
		}
		if (typeof conChange === 'function') {
			e.target = inputEl.current;
			conChange(e);
		}
	};
	const handleChange = () => {};

	const cls = classNames({
		[`${prefixCls}checkbox`]: true,
		[`${prefixCls}checkbox-checked`]: checked,
		[`${prefixCls}checkbox-disabled`]: props.disabled,
	});
	const wrapperCls = classNames({
		[`${prefixCls}checkbox-wrapper`]: true,
		[`${prefixCls}checkbox-wrapper-disabled`]: props.disabled,
	});

	return (
		<span className={wrapperCls} onClick={handleClick}>
			<span className={cls}>
				<input type='checkbox' ref={inputEl} value={value} checked={checked} onChange={handleChange} {...restProps} />
				<span className='ant-checkbox-inner'></span>
			</span>
			<span>{children}</span>
		</span>
	);
};

export default Checkbox;
