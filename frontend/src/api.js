import axios from 'axios';

let BASE_URL = import.meta.env.VITE_API_URL;

// Strictly enforce the production HTTPS URL if the env var is missing,
// undefined, or incorrectly pointing to localhost in a deployed environment.
if (!BASE_URL || BASE_URL === 'undefined' || (import.meta.env.MODE === 'production' && BASE_URL.includes('localhost'))) {
    BASE_URL = 'https://veggiemart-s603.onrender.com';
}

// Ensure no trailing slashes that might duplicate with /api
BASE_URL = BASE_URL.replace(/\/$/, '');

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    // Do not set a timeout. This ensures the frontend gracefully waits 
    // for Render backend cold starts (which can take 50+ seconds)
    // while components continue to display their existing loading spinners.
});

export default api;
