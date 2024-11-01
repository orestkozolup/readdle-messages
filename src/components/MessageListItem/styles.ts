import { SxProps, Theme } from "@mui/material/styles";

export const containerSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.5rem",
  cursor: "pointer",
  height: "6.5rem",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: "0 0.5rem",
  marginBottom: "0.5rem",
  color: (theme) => theme.palette.text.primary,

  backgroundImage: (theme) =>
    `linear-gradient(100deg, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[400]} 100%)`,
  boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.1)`,

  "&:hover": {
    color: "white",
    backgroundImage: (theme) =>
      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.4)`,
  },
};

export const activeItemSx: SxProps<Theme> = {
  color: "white",
  backgroundImage: (theme) =>
    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.4)`,
};

export const readItemSx: SxProps<Theme> = {
  backgroundImage: (theme) =>
    `linear-gradient(100deg, ${theme.palette.grey[100]} 50%, ${theme.palette.grey[200]} 100%)`,
  boxShadow: "unset",
};

export const contentSx: SxProps = {
  marginTop: "0.3rem",
};

export const errorSx: SxProps<Theme> = {
  color: (theme) => theme.palette.error.main,
};

export const firstLineSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}
