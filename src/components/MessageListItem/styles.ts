import { SxProps, Theme } from "@mui/material/styles";

export const containerSx: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.5rem",
  cursor: "pointer",
  height: "10rem",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: "0 0.5rem",

  backgroundImage: `linear-gradient(100deg, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[400]} 100%)`,
  boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.1)`,

  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
    boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.4)`,
  },
});
