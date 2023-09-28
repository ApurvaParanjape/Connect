import { useSelector } from "react-redux";
import Homepage from "./scenes/homePage/Homepage";
import Loginpage from "./scenes/loginPage/Loginpage";
import Profilepage from "./scenes/profilePage/Profilepage";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles"
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme"

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/profile/:userId" element={<Profilepage />} />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
