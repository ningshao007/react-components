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
	content?: ReactNode;
}

export interface messageProps {
	dataSource: { key: number; type: NoticeType; content: ReactNode; duration: number; [propsName: string]: any }[];
}

export const MessageInner = (props: MessageInnerProps) => {
	const { type = 'info', children, content } = props;

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
						{content || children}
					</div>
				</div>
			</div>
		</div>
	);
};

const Message = (props: messageProps) => {
	const { dataSource } = props;
	const [list, setList] = useState(dataSource);

	useEffect(() => {
		setList(dataSource);
	}, [dataSource]);

	list.forEach((item) => {
		if (!item.timer) {
			item.timer = setTimeout(() => {
				const idx = list.indexOf(item);
				if (idx > -1) {
					item.hide = true;
					setList([...list]);
				}
			}, item.duration * 1000);
		}
	});

	return <div className='ant-message'>{list.map((item) => item.hide !== true && <MessageInner {...item} />)}</div>;
};

let messageMountRoot: HTMLDivElement;
let messageIndex = 0;
const messageList: { key: number; type: NoticeType; content: ReactNode; duration: number; [propsName: string]: any }[] = [];

const callMessage = (type: NoticeType, content: ReactNode, duration: number) => {
	if (!messageMountRoot) {
		messageMountRoot = document.createElement('div');
		document.body.appendChild(messageMountRoot);
	}

	messageList.push({
		key: ++messageIndex,
		type,
		content,
		duration,
	});

	ReactDOM.render(<Message dataSource={messageList} />, messageMountRoot);
};

interface INotice {
	success(content: React.ReactNode, duration?: number): void;
	warning(content: React.ReactNode, duration?: number): void;
	loading(content: React.ReactNode, duration?: number): void;
	info(content: React.ReactNode, duration?: number): void;
	error(content: React.ReactNode, duration?: number): void;
}
const Notice: INotice = {
	success: (content, duration = 3) => callMessage('success', content, duration),
	warning: (content, duration = 3) => callMessage('warning', content, duration),
	loading: (content, duration = 3) => callMessage('loading', content, duration),
	info: (content, duration = 3) => callMessage('info', content, duration),
	error: (content, duration = 3) => callMessage('success', content, duration),
};
export default Notice;
