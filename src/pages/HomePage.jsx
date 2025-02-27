import { useState, useEffect, useRef, Suspense, lazy } from "react";

// Lazy load MemeImage component
const MemeImage = lazy(() => import("../components/MemeImage"));

const HomePage = ({ darkMode }) => {
  const [memes, setMemes] = useState([]); // Store memes
  const [visibleIndex, setVisibleIndex] = useState(0); // Track visible meme index
  const memeRef = useRef(null); // Reference for animation

  // Fetch memes from API on mount
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        if (data.success) {
          setMemes(data.data.memes.slice(0, 5)); // Store first 5 memes
        }
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  // Animate meme when index changes
  useEffect(() => {
    if (memeRef.current) {
      window.gsap.fromTo(
        memeRef.current,
        { opacity: 0, y: 50, scale: 0.8, rotate: -10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [visibleIndex]);

  // Show next meme on button click
  const handleNext = () => {
    setVisibleIndex((prevIndex) => (prevIndex + 1) % memes.length);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen
     bg-gray-900 text-white p-4 ${darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
      
      <h1 className="text-4xl font-bold mb-6 text-center">MemeVerse</h1>

      {/* Display meme with lazy loading */}
      <Suspense fallback={<p>Loading...</p>}>
        <div className="relative w-80 h-80 overflow-hidden">
          {memes.length > 0 && (
            <div ref={memeRef} className="w-full h-full">
              <MemeImage meme={memes[visibleIndex]} />
            </div>
          )}
        </div>
      </Suspense>

      {/* Next Meme button */}
      <button
        onClick={handleNext}
        className="mt-4 bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded-lg flex items-center transition-transform transform hover:scale-105"
      >
        <i className="fas fa-arrow-right mr-2"></i> Next Meme
      </button>
    </div>
  );
};

export default HomePage;
