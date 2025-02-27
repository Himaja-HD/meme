import { useState, useEffect } from "react";
import useUserProfile from "../hooks/useUserProfile";
import { getLikedMemes, getUploadedMemes } from "../utils/localStorage";

const UserProfile = () => {
  const { user, updateProfile } = useUserProfile(); // Get user data
  const [name, setName] = useState(user.username); // Store username
  const [bio, setBio] = useState(user.bio); // Store bio
  const [profilePic, setProfilePic] = useState(user.avatarUrl); // Store profile picture
  const [likedMemes, setLikedMemes] = useState([]); // Store liked memes
  const [uploadedMemes, setUploadedMemes] = useState([]); // Store uploaded memes

  // Update states when user data changes
  useEffect(() => {
    setName(user.username);
    setBio(user.bio);
    setProfilePic(user.avatarUrl);
    setLikedMemes(getLikedMemes());
    setUploadedMemes(getUploadedMemes(user.userId));
  }, [user]);

  // Save updated profile data
  const handleSave = () => {
    updateProfile({ username: name, bio, avatarUrl: profilePic });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-4">
        <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full border" /> {/* Profile image */}
        
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-2" 
        /> {/* Username input */}

        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          className="border p-2 w-full" 
        /> {/* Bio input */}

        <button 
          onClick={handleSave} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button> {/* Save button */}
      </div>
    </div>
  );
};

export default UserProfile;
