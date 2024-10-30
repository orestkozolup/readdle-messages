import { SxProps, Theme } from "@mui/material/styles";

export const containerSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: (theme) => theme.palette.error.main,
};
