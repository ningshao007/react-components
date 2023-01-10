import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { MessageInner } from './Message';

import message from './Message';

export default {
	title: 'Example/Message',
	component: MessageInner,
} as ComponentMeta<typeof MessageInner>;

export const MessageInnerDemo = () => {
	return (
		<>
			<MessageInner type='success'>Primary MessageInner</MessageInner>
		</>
	);
};

const info = () => {
	message.info('This is a normal message', 1);
	message.success('This is a normal message', 2);
	message.warning('This is a normal message', 3);
	message.loading('This is a normal message', 4);
	message.error('This is a normal message', 5);
};

export const App: React.FC = () => <button onClick={info}>Display normal message</button>;
