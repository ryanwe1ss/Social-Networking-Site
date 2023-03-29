import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login.js";
import Register from "./pages/Register/register.js";
import Profile from "./pages/Profile/profile.js";
import Messages from "./pages/Messages/messages.js";
import Search from "./pages/Search/search.js";
import Settings from "./pages/Settings/settings.js";
import Posts from "./pages/Posts/posts.js";
import Post from "./pages/Post/post.js";

function App()
{
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/posts" element={<Posts/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/messages" element={<Messages/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/settings" element={<Settings/>}/>
        <Route exact path="/post" element={<Post/>}/>
      </Routes>
    </Router>
  );
}
export default App;