import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

interface Story {
    id: string;
    title: string;
    author: string;
    story: string;
    image: string;
}

const StoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const [story, setStory] = useState<Story | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/data?limit=12`, {
                    signal: controller.signal,
                    headers: { Accept: "application/json" },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch stories");
                }

                const data: Story[] = await res.json();
                const foundStory = data.find((s) => s.id === id);
                setStory(foundStory || null);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.error("Error fetching story:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [id]);

    if (isLoading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (!story) {
        return <div className="text-center p-10">Story not found.</div>;
    }
    if(!story.image){
        console.log(`StoryPage image is unavailable`);
    }

    return (
        <div className="mx-auto p-6 flex justify-center items-center flex-col">
            <h1 className="text-5xl font-bold mb-9 text-center w-full">{story.title}</h1>

            <div className="mb-4">
                    <img
                        src={story.image}
                        alt={story.title}
                        className="rounded-md object-cover w-full h-full"
                    />
            </div>

            <p className="text-gray-600 mb-6">By: {story.author}</p>

            <div className="prose">
                {story.story ? (
                    <p className="whitespace-pre-line">{story.story}</p>
                ) : (
                    <p>No content available for this story.</p>
                )}
            </div>
        </div>
    );
};

export default StoryPage;