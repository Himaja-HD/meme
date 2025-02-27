import { useState } from "react";

const MemeUpload = ({ darkMode }) => {
  // State variables for image, caption, loading, and preview
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Handles image selection and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.includes("image") || file.type.includes("gif"))) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Creates preview URL
    } else {
      alert("Only image and GIF formats are allowed!");
    }
  };

  // Generates a random AI caption
  const generateAICaption = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      const aiCaption = data.data.memes[Math.floor(Math.random() * 10)].name; // Picks a random meme name as caption
      setCaption(aiCaption);
    } catch (error) {
      console.error("AI Caption Error:", error);
    }
    setLoading(false);
  };

  // Handles meme upload (dummy function for now)
  const handleUpload = () => {
    if (!image) {
      alert("Please upload a meme image first!");
      return;
    }
    alert(`Meme Uploaded Successfully! \nCaption: "${caption}"`);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4
      ${darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
      <h1 className="text-3xl font-bold mb-6">Upload Your Meme</h1>

      {/* File input for meme upload */}
      <input
        type="file"
        accept="image/*, .gif"
        onChange={handleImageUpload}
        className="mb-4 p-2 border border-gray-600 rounded"
      />

      {/* Meme preview with caption overlay */}
      {preview && (
        <div className="relative w-80 h-80 border border-gray-600 p-2">
          <img src={preview} alt="Meme Preview" className="w-full h-full object-contain" />
          {caption && (
            <p className="absolute bottom-4 w-full text-center bg-black text-white p-2 opacity-80">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Textarea for custom captions */}
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add a funny caption..."
        className="w-80 mt-4 p-2 border border-gray-600 rounded bg-gray-200 text-gray-900"
      ></textarea>

      {/* Buttons for AI-generated caption and meme upload */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={generateAICaption}
          className="px-4 py-2 bg-gray-700 text-white rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "AI Caption"}
        </button>
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Upload Meme
        </button>
      </div>
    </div>
  );
};

export default MemeUpload;
