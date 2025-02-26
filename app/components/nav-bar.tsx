import { Link } from "react-router";

export default function Navigation() {
    return (
        <nav className="w-[1400px] mx-auto flex px-10 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
            <div className="flex items-center">
                <Link to="/" className="text-xl font-bold tracking-tighter">
                    Academia
                </Link>
            </div>
        </nav>
    );
}
