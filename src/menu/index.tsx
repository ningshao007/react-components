import InternalMenu from './Menu';
import Item from './Item';

type MenuType = typeof InternalMenu;
interface MenuInterface extends MenuType {
	Item: typeof Item;
}

const Menu = InternalMenu as MenuInterface;
Menu.Item = Item;

export default Menu;
