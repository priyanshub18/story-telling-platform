const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/data', async (req, res) => { 
    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: 'fiction',  // You can change this query parameter for other types of books
                maxResults: 20
            }
        });
        
        const books = response.data.items.map(item => ({
            id: item.id,
            Title: item.volumeInfo.title,
            Author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
            Story: item.volumeInfo.description || 'No description available',
            Image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
        }));

        return res.json(books);

    } catch (error) {
        console.error('Error fetching data from Google Books API', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
