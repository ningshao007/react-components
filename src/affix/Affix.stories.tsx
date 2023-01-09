import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Affix from './Affix';
import Affix2 from './Affix2';
import Button from '../button';

export default {
	title: 'Example/Affix',
	component: Affix,
} as ComponentMeta<typeof Affix>;

const Template: ComponentStory<typeof Affix> = (args) => <Affix {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	offsetTop: 10,
	children: (
		<>
			{' '}
			<Button type='primary'>Affix top</Button>
		</>
	),
};

export const Basic = () => {
	return (
		<>
			<Affix2 offsetTop={10}>
				<Button type='primary'>Affix top</Button>
			</Affix2>
			<br />
			<Button type='primary'>Others Button</Button>
		</>
	);
};
