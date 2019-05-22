export type Menu = {
  isOpen: boolean;
};

enum menuActionTypes {
  OPEN_MENU = "OPEN_MENU",
  CLOSE_MENU = "CLOSE_MENU"
}

export const menuActions = {
  openMenu: () => {
    return {
      type: menuActionTypes.OPEN_MENU,
      isOpen: true
    };
  },
  closeMenu: () => {
    return {
      type: menuActionTypes.CLOSE_MENU,
      isOpen: false
    };
  }
};

const menu = (state: Menu = { isOpen: true }, action: any) => {
  switch (action.type) {
    case menuActionTypes.OPEN_MENU:
      return { ...state, isOpen: action.isOpen };
    case menuActionTypes.CLOSE_MENU:
      return { ...state, isOpen: action.isOpen };
    default:
      return state;
  }
};

export default menu;
