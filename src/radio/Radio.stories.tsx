import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Radio from './Radio';

export default {
	title: 'Example/Radio',
	component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'Radio',
};

export const Basic = () => {
	return (
		<>
			<Radio onChange={(e) => console.log(e)}>Primary Radio</Radio>
		</>
	);
};

export const UnChecked = () => {
	return (
		<>
			<Radio checked={false}>Primary Radio</Radio>
			<Radio checked={true}>Primary Radio</Radio>
			<Radio disabled>Primary Radio</Radio>
		</>
	);
};

export const Disabled = () => {
	return (
		<>
			<Radio disabled> Radio</Radio>
		</>
	);
};
