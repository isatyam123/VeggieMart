import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    // Do not set a timeout. This ensures the frontend gracefully waits 
    // for Render backend cold starts (which can take 50+ seconds)
    // while components continue to display their existing loading spinners.
});

export default api;
