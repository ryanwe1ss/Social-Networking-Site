import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Profile from "./components/Profile/Profile.js";

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