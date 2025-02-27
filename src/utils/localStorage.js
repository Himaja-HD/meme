export const getLikedMemes = () => {
  const likedMemes = localStorage.getItem("likedMemes"); // Retrieve
  return likedMemes ? JSON.parse(likedMemes) : []; // Parse
};

export const getUploadedMemes = (userId) => {
  const uploadedMemes = localStorage.getItem(`uploadedMemes_${userId}`); // Retrieve
  return uploadedMemes ? JSON.parse(uploadedMemes) : []; // Parse
};

export const saveLikedMeme = (meme) => {
  const likedMemes = getLikedMemes(); // Get
  likedMemes.push(meme); // Add
  localStorage.setItem("likedMemes", JSON.stringify(likedMemes)); // Save
};

export const saveUploadedMeme = (userId, meme) => {
  const uploadedMemes = getUploadedMemes(userId); // Get
  uploadedMemes.push(meme); // Add
  localStorage.setItem(`uploadedMemes_${userId}`, JSON.stringify(uploadedMemes)); // Save
};
