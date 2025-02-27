import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navLinksRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animate navigation links when the menu opens
  useEffect(() => {
    if (navLinksRef.current && window.gsap) {
      window.gsap.fromTo(
        navLinksRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  return (
    <nav className={`p-4 flex items-center justify-between fixed top-0 left-0 w-full drop-shadow-md z-50 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>

      {/* Logo and Menu Button */}
      <div className="flex flex-row-reverse justify-around">
        <Link to="/" className="text-lg font-bold">MemeVerse</Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="text-2xl md:hidden pr-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 
        ${darkMode ? "bg-gray-800 md:bg-transparent text-white" : "bg-white md:bg-transparent text-gray-900"}
        p-4 md:p-0 shadow-md md:shadow-none transition-all ${isMenuOpen ? "block" : "hidden"} md:block`}
        ref={navLinksRef}
      >
        <Link to="/explore" className="block md:inline hover:text-gray-400">Explore</Link>
        <Link to="/upload" className="block md:inline hover:text-gray-400">Upload</Link>
        <Link to="/leaderboard" className="block md:inline hover:text-gray-400">Leaderboard</Link>
        <Link to="/profile" className="block md:inline hover:text-gray-400">Profile</Link>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        className="p-2 rounded-full transition-colors hover:bg-gray-700 ml-2"
        onClick={(e) => {
          e.stopPropagation(); // Prevent menu from closing when clicking the button
          setDarkMode(!darkMode);
        }}
      >
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </nav>
  );
};

export default Navbar;
