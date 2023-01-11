import { createContext } from 'react';

export interface colType {
	span?: number;
}

export interface FormContextProps {
	onValueChange?: (key: string, value: any) => void;
	labelCol?: colType;
	wrapperCol?: colType;
	values?: Record<string, any>;
	setValues?: (values: Record<string, any>) => void;
	validateRegister?: (name: string, cb: Function) => void;
}

export default createContext<FormContextProps>({});
