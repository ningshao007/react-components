import React, { CSSProperties, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import FormContext, { colType } from './FormContext';
import './index.scss';

export interface formProps extends React.HTMLAttributes<HTMLFormElement> {
	className?: string;
	children?: ReactNode;
	style?: CSSProperties;
	onFinish?: (values: any) => void;
	onFinishFailed?: (errors: any) => void;
	name?: string;
	labelCol?: colType;
	wrapperCol?: colType;
	initialValues?: Record<string, any>;
}

const Form = (props: formProps) => {
	const { className, children, style, onFinish, labelCol, wrapperCol, initialValues, onFinishFailed, ...others } = props;
	const [values, setValues] = useState(initialValues || {});
	const validateMap = useRef<Map<string, Function>>(new Map());
	const errors = useRef<Record<string, any>>({});

	const cls = classNames('ant-form', className, 'ant-form-horizontal');

	const onValueChange = (key: string, value: any) => {
		setValues({ ...values, [key]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onFinish?.(values);

		const itr = validateMap.current.entries();
		for (let i = 0; i < validateMap.current.size; i++) {
			const [key, callbackFunc] = itr.next().value;
			if (typeof callbackFunc === 'function') {
				errors.current[key] = callbackFunc();
			}
		}

		const errorList = Object.keys(errors.current).map((key) => errors.current[key].filter);

		if (errorList.length) {
			onFinishFailed?.(errors.current);
		}
	};

	const handleValidateRegister = (name: string, cb: Function) => {
		validateMap.current.set(name, cb);
	};

	return (
		<FormContext.Provider
			value={{
				onValueChange,
				labelCol,
				wrapperCol,
				values,
				setValues: (v) => setValues(v),
				validateRegister: handleValidateRegister,
			}}>
			<form {...others} className={cls} style={style} onSubmit={handleSubmit}>
				{children}
			</form>
		</FormContext.Provider>
	);
};

export default Form;
