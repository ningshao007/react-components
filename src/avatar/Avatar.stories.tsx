import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from './Avatar';

export default {
	title: 'Example/Avatar',
	component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'Avatar',
};

export const Basic = () => {
	return (
		<>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<Avatar size={64} icon={<span>✅</span>} />
				<Avatar size='large' icon={<span>✅</span>} />
				<Avatar icon={<span>✅</span>} />
				<Avatar size='small' icon={<span>✅</span>} />
			</div>
			<br />
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<Avatar shape='square' size={64} icon={<span>✅</span>} />
				<Avatar shape='square' size='large' icon={<span>✅</span>} />
				<Avatar shape='square' icon={<span>✅</span>} />
				<Avatar shape='square' size='small' icon={<span>✅</span>} />
			</div>
		</>
	);
};

export const Type = () => (
	<>
		<Avatar icon={<span>✅</span>} />
		<Avatar>U</Avatar>
		<Avatar size={40}>USER</Avatar>
		<Avatar src='https://joeschmoe.io/api/v1/random' />
		<Avatar src={<img src='https://joeschmoe.io/api/v1/random' style={{ width: 32 }} />} />
		<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
		<Avatar style={{ backgroundColor: '#87d068' }} icon={<span>✅</span>} />
	</>
);
