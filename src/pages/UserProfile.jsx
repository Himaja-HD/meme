import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../redux/userSlice";
import { getLikedMemes, getUploadedMemes } from "../utils/localStorage";

const UserProfile = ({ darkMode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Redux state

  // State
  const [name, setName] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState(user.avatarUrl);
  const [likedMemes, setLikedMemes] = useState([]);
  const [uploadedMemes, setUploadedMemes] = useState([]);

  useEffect(() => {
    setName(user.username);
    setBio(user.bio);
    setProfilePic(user.avatarUrl);
    setLikedMemes(getLikedMemes());
    setUploadedMemes(getUploadedMemes(user.userId));
  }, [user]); // Sync

  const handleSave = () => {
    dispatch(updateUserProfile({ username: name, bio, avatarUrl: profilePic })); 
  }; // Save

  return (
    <div className={`min-h-screen p-6 max-w-2xl mx-auto ${darkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
      <div className="flex flex-col mt-20 items-center gap-4">
        <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full border" /> {/* Avatar */}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" /> {/* Name */}
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="border p-2 w-full" /> {/* Bio */}
        <button onClick={handleSave} className="bg-gray-700 text-white px-4 py-2 rounded">Save</button> {/* Button */}
      </div>

      <h2 className="mt-6 text-xl font-semibold">Uploaded Memes</h2> {/* Heading */}
      <div className="grid grid-cols-3 gap-4">
        {uploadedMemes.map((meme) => (
          <img key={meme.id} src={meme.url} alt="Uploaded Meme" className="w-full h-auto" />
        ))} {/* Uploaded */}
      </div>

      <h2 className="mt-6 text-xl font-semibold">Liked Memes</h2> {/* Heading */}
      <div className="grid grid-cols-3 gap-4">
        {likedMemes.map((meme) => (
          <img key={meme.id} src={meme.url} alt="Liked Meme" className="w-full h-auto" />
        ))} {/* Liked */}
      </div>
    </div>
  );
};

export default UserProfile; // Export
