import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Menu from './index';

export default {
	title: 'Example/Menu',
	component: Menu,
} as ComponentMeta<typeof Menu>;

// const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
//   type: 'primary',
//   children: 'Menu',
// };

export const App = () => (
	<Menu defaultSelectedKeys={['mail']}>
		<Menu.Item key='mail' id='mail' icon={<span>✅</span>}>
			Navigation One
		</Menu.Item>
	</Menu>
);

// export const Horizontal = () => (
//   <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
//     <Menu.Item key="mail" icon={<span>✅</span>}>
//       Navigation One
//     </Menu.Item>
//     <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu" icon={<span>❌</span>}>
//       <Menu.Item key="two" icon={<span>❌</span>}>
//         Navigation Two
//       </Menu.Item>
//       <Menu.Item key="three" icon={<span>❌</span>}>
//         Navigation Three
//       </Menu.Item>
//     </Menu.SubMenu>
//   </Menu>
// );

export const Inline = () => (
	<Menu mode='inline' defaultSelectedKeys={['mail']} style={{ width: 300 }}>
		<Menu.Item id='mail' icon={<span>✅</span>}>
			Navigation One
		</Menu.Item>
		<Menu.SubMenu id='SubMenu' title='Navigation Two - Submenu' icon={<span>❌</span>}>
			<Menu.Item id='two' icon={<span>❌</span>}>
				Navigation Two
			</Menu.Item>
			<Menu.Item id='three' icon={<span>❌</span>}>
				Navigation Three
			</Menu.Item>
		</Menu.SubMenu>
	</Menu>
);

export const Inline2 = () => (
	<Menu mode='inline' defaultSelectedKeys={['mail']} style={{ width: 300 }}>
		<Menu.Item id='mail' icon={<span>✅</span>}>
			Navigation One
		</Menu.Item>
		<Menu.SubMenu id='SubMenu' title='Navigation Two - Submenu' icon={<span>❌</span>}>
			<Menu.Item id='two' icon={<span>❌</span>}>
				Navigation Two
			</Menu.Item>
			<Menu.Item id='three' icon={<span>❌</span>}>
				Navigation Three
			</Menu.Item>
			<Menu.SubMenu id='SubMenu2' title='Navigation Two - Submenu2' icon={<span>❌</span>}>
				<Menu.Item id='two2' icon={<span>❌</span>}>
					Navigation Two2
				</Menu.Item>
				<Menu.Item id='three2' icon={<span>❌</span>}>
					Navigation Three2
				</Menu.Item>
			</Menu.SubMenu>
		</Menu.SubMenu>
	</Menu>
);
