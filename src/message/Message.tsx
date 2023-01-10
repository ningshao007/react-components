import React, { ReactNode, CSSProperties, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { CheckCircleFilled, InfoCircleFilled, CloseCircleFilled, ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import './index.scss';

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
export interface MessageInnerProps {
	className?: string;
	type?: NoticeType;
	children?: ReactNode;
	style?: CSSProperties;
}

export const MessageInner = (props: MessageInnerProps) => {
	const { type = 'info', children } = props;

	const IconCls = classNames('ant-message-custom-content', {
		[`ant-message-${type}`]: type,
	});
	let icon = <InfoCircleFilled />;

	switch (type) {
		case 'success':
			icon = <CheckCircleFilled />;
			break;
		case 'error':
			icon = <CloseCircleFilled />;
			break;
		case 'warning':
			icon = <ExclamationCircleFilled />;
			break;
		case 'loading':
			icon = <LoadingOutlined />;
			break;
	}

	return (
		<div>
			<div className='ant-message-notice'>
				<div className='ant-message-notice-content'>
					<div className={IconCls}>
						{icon}
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};
