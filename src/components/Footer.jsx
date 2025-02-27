const Footer = ({ darkMode }) => {
  return (
    // Footer with dark mode support
    <footer className={`p-4 text-center w-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}`}>
      <p>&copy; {new Date().getFullYear()} MemeVerse. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
