const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1> {/* Error */}
      <p className="text-xl mb-4">Oops! Meme Not Found</p> {/* Message */}
      
      <img
        src="https://i.imgflip.com/4t0m5.jpg"
        alt="Not Found Meme"
        className="w-80 h-80 object-cover rounded-lg shadow-lg"
      /> {/* Image */}
      
      <a
        href="/"
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
       Go Home
      </a> {/* Button */}
    </div>
  );
};

export default NotFound; // Export
