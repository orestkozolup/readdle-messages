import { SxProps } from "@mui/material/styles";

export const containerSx: SxProps = {
  backgroundColor: "white",
  width: "20rem",
  borderRadius: "0.5rem",
  margin: "auto",
  transform: "translateY(calc(50vh - 10rem))",
  minHeight: "12rem",
  display: "flex",
  flexDirection: "column",
};

export const contentContainerSx: SxProps = {
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 1rem",
};

export const modalFooterSx: SxProps = {
  display: "flex",
  justifyContent: "space-around",
  padding: "0.5rem",
};
