import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from 'react-router-dom';

interface StoryCardProps {
    StoryCardInfo: {
        Title: string;
        Author: string;
        Story: string;
        Image: string;
        id: string;
    };
}

const StoryCard = ({ StoryCardInfo }: StoryCardProps) => {
    const { Title, Author, Image, id } = StoryCardInfo;
    const navigate = useNavigate();

    const handleReadClick = () => {
        navigate(`/story/${id}`);
    };

    return (
        <div className="group relative flex flex-col w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl">
            {/* Image Section */}
            <div className="max-w-[300px] h-full overflow-hidden">
                <img
                    src={Image}
                    alt={Title}
                    className="w-full max-w-[200px] h-auto rounded-lg shadow-lg object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                    }}
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                        {Title}
                    </h3>
                    <h4 className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        By: {Author}
                    </h4>

                    <Button onClick={handleReadClick}>
                        Read
                    </Button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    );
};

export default StoryCard;
