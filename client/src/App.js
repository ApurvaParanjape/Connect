import Homepage from "./scenes/homePage/Homepage";
import Loginpage from "./scenes/loginPage/Loginpage";
import Profilepage from "./scenes/profilePage/Profilepage";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage/>}/>
          <Route path="/profile/:userId" element={<Profilepage/>}/>
          <Route path="/home" element={<Homepage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
