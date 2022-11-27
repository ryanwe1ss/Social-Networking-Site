import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";

function App()
{
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}
export default App;