const MemeImage = ({ meme, index, visibleIndex }) => {
  return (
    // Display meme image with transition effects
    <img
      src={meme.url}
      alt={meme.name}
      loading="lazy" // Improve performance
      className={`absolute left-0 w-full h-full object-contain rounded-lg transition-all duration-500 ${
        index === visibleIndex
          ? "opacity-100 z-20 top-0" // Fully visible
          : index === (visibleIndex + 1) % 5
          ? "opacity-50 z-10 top-[15%] left-3" // Partially visible
          : "opacity-0 pointer-events-none" // Hidden
      }`}
    />
  );
};

export default MemeImage;
