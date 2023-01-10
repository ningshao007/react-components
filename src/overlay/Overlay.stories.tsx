import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Overlay from './Overlay';
import Button from '../button';

export default {
	title: 'Example/Overlay',
	component: Overlay,
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: (
		<div
			style={{
				border: '1px solid black',
				width: 300,
				height: 300,
			}}>
			Content
		</div>
	),
};

export const Basic = () => {
	return (
		<>
			<Overlay onVisibleChange={(e) => console.log(e)} visible>
				<div
					style={{
						border: '1px solid black',
						width: 300,
						height: 300,
					}}>
					Primary Overlay
				</div>
			</Overlay>
		</>
	);
};

export const UnderControl = () => {
	const [visible, setVisible] = useState(true);
	return (
		<>
			<Button onClick={() => setVisible(true)}>click</Button>
			<Overlay visible={visible} onVisibleChange={(v) => setVisible(v)}>
				<div
					style={{
						border: '1px solid black',
						width: 300,
						height: 300,
						position: 'absolute',
						top: 1000,
						left: 200,
					}}>
					Under Control Overlay
				</div>
			</Overlay>
		</>
	);
};
