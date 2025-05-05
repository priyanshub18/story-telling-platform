import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import Discover from "./components/Discover.tsx";
import NotFound from "./components/NotFound.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import StoryPage from "@/components/StoryPage.tsx";

export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/story/:id" element={<StoryPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
