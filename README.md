# meme
github: https://github.com/Himaja-HD/meme.git

Install Dependencies--- 1.npm install vite 2.npm install @reduxjs/toolkit react-redux 3.npm install

npm run dev


MemeVerse: A Fun and Engaging Meme-Sharing Platform
MemeVerse is an interactive platform where users can browse, upload, and engage with memes.
It includes features like meme search, sorting, AI-generated captions, and a leaderboard for popular memes. 
The platform is designed for a smooth and responsive user experience, using optimized API handling,
lazy loading, and animations for better performance.

Key Features
1.Home & Meme Explorer – Fetches memes dynamically from the Imgflip API
with infinite scrolling, search, and sorting options.

 2.Meme Upload – Users can upload memes in image/GIF format, 
with AI-generated caption suggestions and a preview feature.

 3.Meme Details Page – Displays meme details, likes, comments, and sharing options.
Likes are stored in LocalStorage for persistence.

4.User Profile – Shows uploaded and liked memes, 
allowing users to edit their profile (name, bio, and profile picture).

5.Leaderboard – Highlights the top 10 most liked memes, ranking users based on engagement.

6. 404 Page – A custom meme-themed error page for non-existent routes.

Optimizations & Performance Enhancements

- Lazy Loading & Memoization – Ensures faster page loads by optimizing React components.
- Debounced API Calls – Improves search functionality efficiency.
- LocalStorage Middleware – Maintains user data across sessions.
- Efficient Image Loading – Uses optimized image handling for a better browsing experience.
- GSAP Animations – Provides smooth transitions without impacting performance.
  
Tech Stack
- React + Vite – For fast and optimized UI rendering.
- Redux Toolkit – Manages global state (liked & uploaded memes).
- Tailwind CSS – Ensures quick and responsive styling.
- GSAP & Framer Motion – Adds smooth animations and transitions.
- LocalStorage & APIs (Imgflip, ImgBB) – Handles meme fetching, storage, and management.




