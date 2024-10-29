import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";
import Dashboard from "./components/Dashboard";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
