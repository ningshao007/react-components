import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Progress from './Progress';

export default {
	title: 'Example/Progress',
	component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	percent: 30,
};

export const Basic = () => {
	return (
		<>
			<Progress percent={30}>Primary Progress</Progress>
			<br />
			<Progress percent={70} status='exception' />
		</>
	);
};

export const Dynamic: React.FC = () => {
	const [percent, setPercent] = React.useState(0);

	const increase = () => {
		let newPercent = percent + 10;
		if (newPercent > 100) {
			newPercent = 100;
		}
		setPercent(newPercent);
	};

	const decline = () => {
		let newPercent = percent - 10;
		if (newPercent < 0) {
			newPercent = 0;
		}
		setPercent(newPercent);
	};

	return (
		<>
			<Progress percent={percent} />
			<br />
			<br />

			<button onClick={increase}>+</button>
			<button onClick={decline}>-</button>
		</>
	);
};
