import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login.js";
import Register from "./pages/Register/register.js";
import Profile from "./pages/Profile/profile.js";
import Messages from "./pages/Messages/messages.js";

function App()
{
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/messages" element={<Messages/>}/>
      </Routes>
    </Router>
  );
}
export default App;