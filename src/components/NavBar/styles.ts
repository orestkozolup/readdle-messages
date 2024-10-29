import { SxProps, Theme } from "@mui/material/styles";

export const containerSx: SxProps = {
  margin: "0.5rem auto",
  overflowX: "auto",
  overflowY: "clip",
};

export const itemsGroupSx: SxProps<Theme> = {
  backgroundImage: (theme) =>
    `linear-gradient(100deg, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[400]} 100%)`,
  boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.1)`,
};

export const navItemSx: SxProps<Theme> = {
  "&:hover": {
    color: "white",
    backgroundImage: (theme) =>
      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
    boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.4)`,
  },
};

export const activeNavItemSx: SxProps<Theme> = {
  color: "white",
  backgroundImage: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.4)`,
};
