import { useEffect, useState, useRef } from "react";
import StoryCard from "@/components/StoryCard.tsx";
import { Skeleton } from "@/components/ui/skeleton";

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    image: string;
}

const Featured = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const abortControllerRef = useRef<AbortController>();

    useEffect(() => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const fetchBooks = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`http://localhost:3000/data?limit=12`, {
                    signal: controller.signal,
                    headers: { Accept: "application/json" },
                });

                if (!res.ok) throw new Error(`Failed to load stories (${res.status})`);

                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Invalid data format");

                const validated = data.map((book: any) => ({
                    id: book.id || '',
                    title: book.title || 'Untitled',
                    author: book.author || 'Unknown Author',
                    description: book.description || 'No description available',
                    image: book.image || 'https://via.placeholder.com/150'
                }));

                setBooks(validated);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error("Fetch error:", err);
                    setError(err.message || "Connection error");
                    setBooks([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
        return () => controller.abort();
    }, [retryCount]);

    const handleRetry = () => setRetryCount(prev => prev + 1);

    const renderSkeletons = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-96 w-full bg-gray-800 rounded-lg" />
            ))}
        </div>
    );

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Stories</h2>
                    <p className="mb-6">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-900 text-white w-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 m-6">
                    <h1 className="text-4xl md:text-5xl font-bold py-4">Featured Stories</h1>
                </div>

                {loading ? (
                    renderSkeletons()
                ) : books.length === 0 ? (
                    <div className="text-center text-gray-400 text-lg">No stories available.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-2">
                        {books.map((book) => (
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
                )}
            </div>
        </section>
    );
};

export default Featured;
