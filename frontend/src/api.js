import axios from 'axios';

// Ensure the API URL correctly falls back for production if env var is missing,
// and doesn't end up as 'undefined/api'
const envUrl = import.meta.env.VITE_API_URL;
const BASE_URL = (envUrl && envUrl !== 'undefined') ? envUrl : 'https://veggiemart-s603.onrender.com';

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    // Do not set a timeout. This ensures the frontend gracefully waits 
    // for Render backend cold starts (which can take 50+ seconds)
    // while components continue to display their existing loading spinners.
});

// Helper to reliably construct absolute image URLs from the backend
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    // If it's already an absolute URL (e.g. Unsplash), return as-is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise prepend the backend URL
    return `${BASE_URL}${imagePath}`;
};

export default api;
