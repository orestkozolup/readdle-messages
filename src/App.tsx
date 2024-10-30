import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import "./App.css";
import Dashboard from "./components/Dashboard";
import ErrorFallback from "./components/ErrorFallback";
import { useObservable } from "./hooks/useObservable";
import { messageService } from "./services/messageService";

const theme = createTheme();

function App() {
  const error = useObservable(messageService.error$, "");

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {error ? <ErrorFallback error={error} /> : <Dashboard />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
