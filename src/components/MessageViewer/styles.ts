import { SxProps, Theme } from "@mui/material/styles";

export const containerSx: SxProps = {
  marginTop: "3.5rem",
};

export const messageContainerSx: SxProps<Theme> = {
  backgroundImage: (theme) =>
    `linear-gradient(100deg, ${theme.palette.grey[100]} 50%, ${theme.palette.grey[200]} 100%)`,
  boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.4)`,
  padding: "1rem",
  marginTop: "1rem",
  borderRadius: "0.5rem",
  maxHeight: "73vh",
  overflowY: "auto",
};
