import React, { CSSProperties, useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';

type autoSizeType = {
	minRows: number;
	maxRows: number;
};

export interface inputProps {
	defaultValue?: string;
	value?: string;
	onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	maxLength?: number;
	showCount?: boolean;
	autoSize?: boolean | autoSizeType;
	prefix?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
	style?: CSSProperties;
	status?: 'error' | 'warning';
}

const TextArea = (props: inputProps) => {
	const { defaultValue, value: pValue, onChange, children, prefix, showCount = false, autoSize = false, status, ...restProps } = props;
	const [value, setValue] = useState(defaultValue || pValue || '');
	const [height, setHeight] = useState(0);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (typeof autoSize === 'object') {
			const { minRows, maxRows } = autoSize;
			const styles = window.getComputedStyle(textareaRef.current!);
			const height = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom) + parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
			const minHeight = minRows * parseFloat(styles.lineHeight);
			const maxHeight = maxRows * parseFloat(styles.lineHeight);

			textareaRef.current!.setAttribute('style', `min-height: ${minHeight}px; max-height: ${maxHeight}px;`);
		}
	});

	useEffect(() => {
		if ('value' in props) {
			if (typeof pValue === 'undefined') {
				setValue('');
			} else {
				setValue(pValue);
			}
		}
	}, [props, pValue]);

	const cls = classNames('ant-input', {
		[`aut-input-status-${status}`]: status,
	});
	const wrapperCls = classNames('ant-input-textarea', {
		'ant-input-textarea-show-count': showCount,
	});

	const style: CSSProperties = {};
	if (height) {
		style.height = height;
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!('value' in props)) {
			const value = e.target.value;
			setValue(value);

			if (autoSize) {
				let line = value.split('\n').length;
				if (line < 2) line = 2;

				const styles = window.getComputedStyle(textareaRef.current!);
				const height = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom) + parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
				const contentHeight = line * parseFloat(styles.lineHeight);
				const totalHeight = height + contentHeight;

				setHeight(totalHeight);
			}
		}

		onChange?.(e);
	};

	const textarea = <textarea className={cls} value={value} onChange={handleChange} ref={textareaRef} style={style} {...restProps} />;

	if (showCount) {
		return (
			<span className={wrapperCls} data-count={`${value.length} / ${props.maxLength}`}>
				{textarea}
			</span>
		);
	}

	return textarea;
};

export default TextArea;
