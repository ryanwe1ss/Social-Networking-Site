import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Components
import Login from "./pages/Login/login.js";
import Register from "./pages/Register/register.js";
import Profile from "./pages/Profile/profile.js";
import Messages from "./pages/Messages/messages.js";
import Notifications from "./pages/Notifications/notifications.js";
import SavedPosts from "./pages/SavedPosts/saved-posts.js";
import Search from "./pages/Search/search.js";
import Settings from "./pages/Settings/settings.js";
import Feed from "./pages/Feed/feed.js";
import Post from "./pages/Post/post.js";

// Admin Components
import Statistics from "./pages/Admin/Statistics/statistics.js";
import MonitorPosts from "./pages/Admin/MonitorPosts/monitor-posts.js";
import UserSettings from "./pages/Admin/UserSettings/user-settings.js";
import Reports from "./pages/Admin/Reports/reports.js";

function App()
{
  return (
    <Router>
      <Routes>
        {/* User Account Routes */}
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/feed" element={<Feed/>}/>
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/messages" element={<Messages/>}/>
        <Route exact path="/notifications" element={<Notifications/>}/>
        <Route exact path="/saved-posts" element={<SavedPosts/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/settings" element={<Settings/>}/>
        <Route exact path="/post" element={<Post/>}/>

        {/* Admin Account Routes */}
        <Route exact path="/statistics" element={<Statistics/>}/>
        <Route exact path="/monitor-posts" element={<MonitorPosts/>}/>
        <Route exact path="/user-settings" element={<UserSettings/>}/>
        <Route exact path="/reports" element={<Reports/>}/>
      </Routes>
    </Router>
  );
}
export default App;