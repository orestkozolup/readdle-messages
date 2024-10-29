import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";
import Dashboard from "./components/Dashboard";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;
