import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { dark } from '@clerk/themes'
import { Compass, BookOpen } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
                {/* Logo with hover effect */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        StoryVerse
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Navigation buttons with icons */}
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/discover")}
                        className="gap-2 hover:bg-accent/90"
                    >
                        <Compass className="h-4 w-4" />
                        <span>Discover</span>
                    </Button>

                    {/* Auth section */}
                    <div className="flex items-center gap-2 ml-2">
                        <SignedIn>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    baseTheme: dark,
                                }}
                            />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton>
                                <Button variant="default" size="sm">
                                    Sign In
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar