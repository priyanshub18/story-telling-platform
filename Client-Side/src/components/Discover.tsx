import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import StoryCard from './StoryCard';
import '../components/ui/Styles/Discover.css';

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    image: string;
}

interface StoryCardProps {
    id: string;
    title: string;
    author: string;
    description: string;
    image: string;
}

const Discover = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 5;
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Create a new AbortController for each request
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const fetchBooks = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`http://localhost:3000/data?limit=12`, {
                    signal: controller.signal,
                    headers: { Accept: 'application/json' },
                });

                if (!res.ok) throw new Error(`Failed to load stories (${res.status})`);

                const data = await res.json();
                if (!Array.isArray(data)) throw new Error('Invalid data format');

                const validated = data.map((book: any) => ({
                    id: book.id || '',
                    title: book.title || 'Untitled',
                    author: book.author || 'Unknown Author',
                    description: book.description || 'No description available',
                    image: book.image || 'https://via.placeholder.com/150',
                }));

                setBooks(validated);
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.error('Fetch error:', err);
                    setError(err.message || 'Connection error');
                    setBooks([]);
                }
            } finally {
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchBooks();

        // Cleanup function to abort fetch on unmount or dependency change
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [currentPage]); // Add currentPage as dependency to refetch when page changes

    const filteredData = books.filter(
        (item) =>
            (item.title &&
                typeof item.title === 'string' &&
                item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.author &&
                typeof item.author === 'string' &&
                item.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const categories = [
        { name: 'All', link: '/test' },
        { name: 'Story', link: '/test2' },
        { name: 'Jokes', link: '/test3' },
        { name: 'Fan-Fiction', link: '/test4' },
        { name: 'Poetry', link: '/test3' },
        { name: 'Romance', link: '/test3' },
        { name: 'Fantasy', link: '/test3' },
        { name: 'Horror', link: '/test3' },
        { name: 'Sci-Fi', link: '/test3' },
        { name: 'Mystery', link: '/test3' },
    ];

    const sortOptions = [
        { name: 'Popularity' },
        { name: 'Recent' },
        { name: 'Tags' },
    ];

    const handleOnclick = (link: string) => {
        navigate(link);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="Discover">
            <div className="First-header">
                <h1>Discover</h1>
                <div className="Categories">
                    {categories.map((category, index) => (
                        <button key={index} onClick={() => handleOnclick(category.link)}>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="Second-header">
                <h2>Sort By</h2>
                <div className="Sort-Bar">
                    {sortOptions.map((sort, index) => (
                        <NavLink
                            key={index}
                            to={`/sort/${sort.name.toLowerCase()}`}
                            className={({ isActive }) => (isActive ? 'isActive' : '')}
                        >
                            {sort.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="Search-Bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for stories, jokes, and more..."
                />
            </div>

            {loading && <div>Loading...</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="Filter-Bar">
                {currentItems.map((book) => (
                    <StoryCard
                        key={book.id}
                        StoryCardInfo={{
                            Title: book.title,
                            Author: book.author,
                            Story: book.description,
                            Image: book.image,
                            id: book.id
                        }}
                    />
                ))}
            </div>

            <div className="Pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages || 1} </span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Discover;