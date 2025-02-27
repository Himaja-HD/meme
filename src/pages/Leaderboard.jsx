import { useState, useEffect } from "react";

const Leaderboard = ({ darkMode }) => {
  // State to store the top liked memes
  const [memes, setMemes] = useState([]); 
  // State to store the top users based on engagement
  const [userRankings, setUserRankings] = useState([]); 

  useEffect(() => {
    // Retrieve meme data from local storage
    const storedMemes = JSON.parse(localStorage.getItem("likedMemesData")) || [];
    // Retrieve user engagement data from local storage
    const storedUserEngagement = JSON.parse(localStorage.getItem("userEngagement")) || {};

    // Sort memes by number of likes (highest first) and select the top 10
    const sortedMemes = storedMemes.sort((a, b) => b.likes - a.likes).slice(0, 10);
    setMemes(sortedMemes);

    // Convert user engagement object to an array, sort by total interactions (likes + comments), and get top 10 users
    const sortedUsers = Object.entries(storedUserEngagement)
      .map(([username, data]) => ({ username, ...data }))
      .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
      .slice(0, 10);

    setUserRankings(sortedUsers);
  }, []); // Run effect only once on component mount

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Meme Leaderboard</h1>

      {/* Section for Top 10 Most Liked Memes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Top 10 Most Liked Memes</h2>
        <div className="mt-4">
          {/* Check if there are memes available */}
          {memes?.length > 0 ? (
            memes.map((meme, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border-b">
                <span className="text-lg font-bold">{index + 1}.</span>
                <img src={meme.url} alt="Meme" className="w-20 h-20 rounded-lg" />
                <p>👍 {meme.likes}</p>
              </div>
            ))
          ) : (
            <p>No memes yet!</p> // Message if there are no memes
          )}
        </div>
      </div>

      {/* Section for Top Users by Engagement */}
      <div>
        <h2 className="text-2xl font-semibold">👑 Top Users by Engagement</h2>
        <div className="mt-4">
          {/* Check if there are ranked users */}
          {userRankings?.length > 0 ? (
            userRankings.map((user, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border-b">
                <span className="text-lg font-bold">{index + 1}.</span>
                <p className="font-semibold">{user.username}</p>
                <p>🔥 {user.likes} Likes • 💬 {user.comments} Comments</p>
              </div>
            ))
          ) : (
            <p>No user rankings yet! 🎯</p> // Message if no users are ranked
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
