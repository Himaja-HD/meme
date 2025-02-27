import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load user profile from localStorage (storage)
const loadUserFromLocalStorage = () => {
  try {
    const savedUser = localStorage.getItem("userProfile");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return null;
  }
};

// Default state if no saved profile (default)
const initialState = loadUserFromLocalStorage() || {
  userId: `user_${Date.now()}`,
  username: "New User",
  bio: "Excited to share memes!",
  avatarUrl: "https://via.placeholder.com/150",
  likedMemeIds: [],
  uploadedMemeIds: [],
  status: "idle", // Status for async calls (status)
  error: null,
};

// Async function to fetch user data (fetch)
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.example.com/user-profile"); // Replace with actual API
      if (!response.ok) throw new Error("Failed to fetch user profile");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Unknown error");
    }
  }
);

// Redux Slice (slice)
const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      Object.assign(state, action.payload); // Update
    },
    resetUserProfile: (state) => {
      return { ...initialState }; // Reset
    },
    likeMeme: (state, action) => {
      if (!state.likedMemeIds.includes(action.payload)) {
        state.likedMemeIds.push(action.payload); // Like
      }
    },
    unlikeMeme: (state, action) => {
      state.likedMemeIds = state.likedMemeIds.filter((id) => id !== action.payload); // Unlike
    },
    addUploadedMeme: (state, action) => {
      state.uploadedMemeIds.push(action.payload); // Upload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading"; // Loading
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = "succeeded"; // Success
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed"; // Failed
        state.error = action.payload;
      });
  },
});

// Sync Redux state with localStorage (sync)
export const syncLocalStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState().userProfile;
  try {
    localStorage.setItem("userProfile", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
  return result;
};

// Export actions (export)
export const { updateUserProfile, resetUserProfile, likeMeme, unlikeMeme, addUploadedMeme } =
  userSlice.actions;

export default userSlice.reducer; // Reducer
