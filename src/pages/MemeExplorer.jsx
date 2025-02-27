import { useState, useEffect, useRef, useCallback } from "react";
import MemeCard from "../components/Memecard";

const MemeExplorer = ({ darkMode }) => {
  const [memes, setMemes] = useState([]); // Stores the list of memes
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input
  const [sortOption, setSortOption] = useState("date"); // Stores selected sorting option
  const [category, setCategory] = useState("trending"); // Stores selected category
  const [page, setPage] = useState(1); // Tracks current page for pagination
  const observer = useRef(null); // Ref for infinite scrolling

  // Fetch Memes from API
  const fetchMemes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      const fetchedMemes = data.data.memes
        .slice(0, 15)
        .map((meme) => ({
          ...meme,
          likes: Math.floor(Math.random() * 5000), // Random likes
          comments: Math.floor(Math.random() * 500), // Random comments
          date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)), // Random date
        }));

      setMemes((prevMemes) => (page === 1 ? fetchedMemes : [...prevMemes, ...fetchedMemes]));
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
    setLoading(false);
  }, [page, category]);

  // Fetch memes when search query changes (with debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1); // Reset page on search
      fetchMemes();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  // Fetch memes when category or page changes
  useEffect(() => {
    fetchMemes();
  }, [category, page]);

  // Infinite Scroll - Loads more memes when last meme is visible
  const lastMemeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // Filters memes based on search query
  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorts memes based on selected option
  const sortedMemes = [...filteredMemes].sort((a, b) => {
    if (sortOption === "likes") return b.likes - a.likes;
    if (sortOption === "comments") return b.comments - a.comments;
    if (sortOption === "date") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 
    ${darkMode ? "bg-white text-gray-900":"bg-gray-800 text-white"}`}>
      <h1 className="text-4xl font-bold mb-6">🚀 Meme Explorer</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search memes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`p-2 mb-4 rounded border border-gray-600 
          ${darkMode ? "bg-gray-200 text-gray-900":"bg-gray-800 text-white"}`}
      />

      {/* Category & Sort Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`p-2 rounded border border-gray-600 ${darkMode ? "bg-gray-200 text-gray-900": "bg-gray-800 text-white"}`}
        >
          <option value="trending">Trending</option>
          <option value="new">New</option>
          <option value="classic">Classic</option>
          <option value="random">Random</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={`p-2 rounded border border-gray-600 ${darkMode ? "bg-gray-200 text-gray-900":"bg-gray-800 text-white"}`}
        >
          <option value="date">Newest</option>
          <option value="likes">Most Liked</option>
          <option value="comments">Most Commented</option>
        </select>
      </div>

      {/* Display Memes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedMemes.map((meme, index) => (
          <div key={meme.id} ref={index === sortedMemes.length - 1 ? lastMemeRef : null}>
            <MemeCard meme={meme} darkMode={darkMode} />
          </div>
        ))}
      </div>

      {loading && <p className="animate-pulse mt-4">Loading more memes...</p>}
    </div>
  );
};

export default MemeExplorer;
