import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { CheckboxChangeEvent } from './Checkbox';
import { checkboxContext } from './context';
import './index.scss';

export interface GroupProps {
	defaultValue?: Array<string>;
	value?: Array<string>;
	onChange?: Function;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

const Group = (props: GroupProps) => {
	const { disabled, children, onChange, ...others } = props;

	const [value, setValue] = useState(props.defaultValue || props.value || []);

	useEffect(() => {
		if ('value' in props) {
			setValue(props.value!);
		}
	}, [props, props.value]);

	const cls = classNames({
		'ant-checkbox-group': true,
	});

	const handleChange = (e: CheckboxChangeEvent) => {
		const targetValue = e.target.value;
		const idx = value.indexOf(targetValue);
		const checked = e.target.checked;

		let newValue = value;
		if (idx === -1 && !checked) {
			newValue = value.concat([targetValue]);
			setValue(newValue);
		} else if (idx > -1 && checked) {
			value.splice(idx, 1);
			newValue = value.concat([]);
			setValue(newValue);
		}

		onChange?.(newValue);
	};

	return (
		<span className={cls}>
			<checkboxContext.Provider
				value={{
					onChange: handleChange,
					disabled: disabled,
					value,
				}}>
				{children}
			</checkboxContext.Provider>
		</span>
	);
};

export default Group;
