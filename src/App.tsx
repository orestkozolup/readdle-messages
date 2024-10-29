import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import "./App.css";
import Dashboard from "./components/Dashboard";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
