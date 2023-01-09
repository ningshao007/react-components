import { createContext } from 'react';

export interface CheckboxContextProps {
	value: string[];
	onChange: (e: any) => void;
	disabled?: boolean;
}

const checkboxContext = createContext<CheckboxContextProps>({
	value: [],
	onChange: (e) => {},
	disabled: false,
});

export { checkboxContext };
