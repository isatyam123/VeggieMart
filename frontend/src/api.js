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

export default api;
