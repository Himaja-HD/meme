import PropTypes from "prop-types";

const MemeCard = ({ meme }) => {
  return (
    // Meme card container
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      
      {/* Meme image */}
      <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover rounded" />
      
      {/* Meme details */}
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold text-black dark:text-white">{meme.name}</h3>
        
        {/* Meme stats: Likes, Comments, and Date */}
        <div className="flex flex-row justify-around">
          <p className="text-gray-500 dark:text-gray-300 text-sm">❤️ {meme.likes}</p>
          <p className="text-gray-500 dark:text-gray-300 text-sm">💬 {meme.comments}</p>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            📅 {new Date(meme.date).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// Prop validation
MemeCard.propTypes = {
  meme: PropTypes.object.isRequired,
};

export default MemeCard;
