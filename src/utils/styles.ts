import { SxProps, Theme } from "@mui/material/styles";

export const combineStyles = (
  condition: boolean,
  base: SxProps<Theme>,
  ...optionalStyles: SxProps<Theme>[]
): SxProps<Theme> => {
  const combinedStyles: SxProps<Theme> = {
    ...base,
  };

  if (condition) {
    optionalStyles.forEach((optional) => {
      Object.assign(combinedStyles, optional);
    });
  }

  return combinedStyles;
};
