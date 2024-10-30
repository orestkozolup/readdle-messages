import { Box } from "@mui/material";

import { containerSx } from "./styles";

interface ErrorFallbackProps {
  error: string;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => (
  <Box sx={containerSx}>
    {error ? `An error has occured: ${error}` : "Something went wrong"}. Please
    try again later.
  </Box>
);

export default ErrorFallback;
