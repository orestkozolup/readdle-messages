import { SxProps, Theme } from "@mui/material/styles";

export const containerSx: SxProps = {
  height: "2rem",
  marginTop: "0.5rem",
  display: "flex",
  justifyContent: "space-around",
  overflowX: "auto",
  overflowY: "clip",
};

export const navItemSx: SxProps<Theme> = {
  backgroundColor: "blue"
};

export const activeNavItemSx: SxProps<Theme> = {
  backgroundColor: "red"
};
