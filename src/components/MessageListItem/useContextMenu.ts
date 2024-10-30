import { useState, MouseEvent } from "react";

export const useContextMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  const handleCloseEvent = (event: MouseEvent<HTMLElement>, reason: string) => {
    if (reason === "backdropClick") event.stopPropagation();
    setAnchorEl(null);
  };

  return {
    anchorEl,
    isMenuOpen: !!anchorEl,
    openMenu,
    closeMenu,
    handleCloseEvent,
  };
};
