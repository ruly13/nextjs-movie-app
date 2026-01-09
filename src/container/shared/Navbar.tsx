import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/5 supports-[backdrop-filter]:bg-black/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <span className="font-bold text-xl tracking-tight text-white">MovieDB</span>
        </Link>
        <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="#" className="hover:text-white transition-colors">
                Movies
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
                TV Shows
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
                People
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
                More
            </Link>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-gray-300 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-white/10">
                    {/* Placeholder for avatar */}
                    <User className="w-5 h-5 text-zinc-400" />
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
}
