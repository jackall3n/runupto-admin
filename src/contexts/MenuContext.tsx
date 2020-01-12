import React, { createContext, useContext, useState } from "react";

export const MenuContext = createContext({
  menuOpen: false,
  toggleMenu: (open: boolean) => {
  }
});
export const useMenu = () => useContext(MenuContext);

export const MenuProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ menuOpen, toggleMenu: setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  )
};
