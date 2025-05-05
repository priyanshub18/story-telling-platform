require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Config
const API_KEYS = {
    GOOGLE_BOOKS: process.env.GOOGLE_BOOKS_API_KEY || 'AIzaSyC6kvdDkqSvy9KMVxq00z_aL5g1SznIY3U'
};

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced API Fetch with debugging
async function fetchBooks(query = 'fiction', maxResults = 12) {
    try {
        console.log(`Fetching books with query: "${query}"`);

        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query, // Removed encodeURIComponent - axios handles this
                maxResults: Math.min(parseInt(maxResults), 40),
                key: API_KEYS.GOOGLE_BOOKS,
                printType: 'books',
                langRestrict: 'en'
            },
            timeout: 10000
        });

        console.log(`API Success. Items received: ${response.data.items?.length || 0}`);

        return response.data.items?.map(item => ({
            id: item.id,
            title: item.volumeInfo.title || 'Untitled',
            author: (item.volumeInfo.authors || ['Unknown']).join(', '),
            description: item.volumeInfo.description || 'No description available',
            image: item.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') ||
                'https://via.placeholder.com/150'
        })) || [];

    } catch (error) {
        console.error('Full API Error:', {
            message: error.message,
            config: {
                url: error.config?.url,
                params: error.config?.params
            },
            response: error.response?.data || 'No response data'
        });
        return [];
    }
}

// Routes
app.get('/data', async (req, res) => {
    try {
        const { search = 'fiction', limit = 12 } = req.query;
        const safeLimit = Math.min(parseInt(limit) || 12, 40);

        console.log(`Request received - Search: "${search}", Limit: ${safeLimit}`);

        let books = await fetchBooks(search, safeLimit);

        if (books.length === 0) {
            console.log('Attempting local fallback...');
            try {
                books = require('./stories.json');
                console.log(`Loaded ${books.length} local books`);
            } catch (localError) {
                console.error('Local fallback failed:', localError);
                books = [];
            }
        }

        res.json(books.slice(0, safeLimit));

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
});

app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`);
    console.log(`Google Books API: ${API_KEYS.GOOGLE_BOOKS ? 'Enabled' : 'Disabled'}`);
    console.log(`Test endpoint: http://localhost:${PORT}/data?search=fiction&limit=5\n`);
});