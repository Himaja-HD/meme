import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MemeDetails = ({ darkMode }) => {
  const { id } = useParams(); // Get meme ID from URL
  const [meme, setMeme] = useState(null); // State to store meme details
  const [likes, setLikes] = useState(0); // State to store likes count
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(""); // State to handle new comment input

  // Fetch meme details from API and load stored likes/comments
  useEffect(() => {
    const fetchMeme = async () => {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      const memeData = data.data.memes.find((m) => m.id === id) || null;
      setMeme(memeData);

      // Load Likes & Comments from Local Storage
      setLikes(parseInt(localStorage.getItem(`likes-${id}`)) || 0);
      setComments(JSON.parse(localStorage.getItem(`comments-${id}`)) || []);
    };
    fetchMeme();
  }, [id]); // Run effect when meme ID changes

  // Handle Like Button Click
  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${id}`, newLikes); // Store updated likes in Local Storage
  };

  // Handle Adding a New Comment
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return; // Prevent empty comments
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments)); // Store updated comments
    setNewComment(""); // Clear input field
  };

  // Show loading message if meme data is not available
  if (!meme) return <p className="text-center mt-10">Loading Meme...</p>;

  return (
    <div className={`min-h-screen p-6 flex flex-col items-center
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      
      {/* Meme Title */}
      <h1 className="text-3xl font-bold mb-4">{meme.name}</h1>

      {/* Meme Image */}
      <img src={meme.url} alt={meme.name} className="w-96 rounded-lg shadow-lg" />

      {/* Like & Share Buttons */}
      <div className="flex gap-6 mt-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2 animate-bounce"
        >
          ❤️ {likes} Likes
        </button>

        {/* Share Button */}
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          🔗 Share
        </button>
      </div>

      {/* Comments Section */}
      <div className="w-96 mt-6">
        <h2 className="text-xl font-semibold mb-2">💬 Comments</h2>

        {/* Comment Input Field */}
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-600 rounded mb-2 bg-gray-200 text-gray-900"
        />
        
        {/* Add Comment Button */}
        <button
          onClick={handleCommentSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded w-full"
        >
          ➕ Add Comment
        </button>

        {/* Display Comments */}
        <ul className="mt-4">
          {comments.map((comment, index) => (
            <li key={index} className="p-2 border-b border-gray-600">
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemeDetails;
