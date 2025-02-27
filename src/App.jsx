import { Provider } from "react-redux"; // State
import { store } from "./redux/store"; // Store
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Routing
import { useState } from "react"; // State
import Navbar from "./components/Navbar"; // Header
import Footer from "./components/Footer"; // Footer
import HomePage from "./pages/HomePage"; // Home
import MemeExplorer from "./pages/MemeExplorer"; // Explore
import MemeUpload from "./pages/MemeUpload"; // Upload
import MemeDetails from "./pages/MemeDetails"; // Details
import UserProfile from "./pages/UserProfile"; // Profile
import Leaderboard from "./pages/Leaderboard"; // Ranking
import UploadMeme from "./pages/MemeUpload";
import NotFound from "./pages/NotFound";

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // Theme

  return (
    <Provider store={store}> {/* Redux */}
      <Router> {/* Navigation */}
        <div className={darkMode ? "dark" : ""}> {/* Theme */}
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> {/* Header */}
          <Routes> {/* Pages */}
            <Route path="/" element={<HomePage darkMode={darkMode} />} /> {/* Home */}
            <Route path="/explore" element={<MemeExplorer darkMode={darkMode} />} /> {/* Explore */}
            <Route path="/upload" element={<MemeUpload darkMode={darkMode} />} /> {/* Upload */}
            <Route path="/meme/:id" element={<MemeDetails darkMode={darkMode} />} /> {/* Details */}
            <Route path="/profile" element={<UserProfile darkMode={darkMode} />} /> {/* Profile */}
            <Route path="/leaderboard" element={<Leaderboard darkMode={darkMode} />} /> {/* Ranking */}
            <Route path="/upload" element={<UploadMeme />} />
            <Route path="*" element={<NotFound/>} />
          
          </Routes>
          <Footer darkMode={darkMode} /> {/* Footer */}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
