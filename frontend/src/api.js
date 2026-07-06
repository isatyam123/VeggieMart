import axios from 'axios';

// Completely ignore Vercel environment variables in production to prevent 
// copy-paste typos (like 'veggiemart-s603.onrender.comhttps://...').
const BASE_URL = import.meta.env.MODE === 'production'
    ? 'https://veggiemart-s603.onrender.com'
    : 'http://localhost:5000';

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    // Do not set a timeout. This ensures the frontend gracefully waits 
    // for Render backend cold starts (which can take 50+ seconds).
});

export default api;
