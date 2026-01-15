"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Bell, Search, User, X, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 supports-[backdrop-filter]:bg-black/60">
      <Suspense fallback={<div className="h-16" />}>
        <NavbarContent />
      </Suspense>
    </nav>
  );
}

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  
  // Sync internal state with URL query param
  const paramQ = searchParams.get("q") || "";
  useEffect(() => {
    setQuery(paramQ);
  }, [paramQ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/tv-shows", label: "TV Shows" },
    // { href: "/my-list", label: "My List" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  return (
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Search Overlay Mode */}
        {isMobileSearchOpen ? (
            <div className="flex w-full items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
                <form onSubmit={handleSearch} className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search movies..." 
                        autoFocus
                        className="w-full bg-zinc-900 border border-white/10 rounded-full py-2 pl-10 pr-10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
                    />
                    {query && (
                        <button 
                            type="button"
                            onClick={() => { setQuery(""); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </form>
                <button 
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="text-sm font-medium text-gray-300 hover:text-white whitespace-nowrap"
                >
                    Cancel
                </button>
            </div>
        ) : (
            <>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <span className="font-bold text-xl tracking-tight text-white">MovieDB</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300 shrink-0 ml-6">
                    {navLinks.map((link) => {
                      const isActive = link.href === "/" 
                        ? pathname === "/" 
                        : pathname.startsWith(link.href);
                        
                      return (
                        <Link 
                          key={link.href}
                          href={link.href} 
                          className={cn(
                            "transition-colors",
                            isActive ? "text-red-600 font-bold" : "hover:text-white"
                          )}
                        >
                            {link.label}
                        </Link>
                      );
                    })}
                </div>

                {/* Search Bar - Desktop */}
                {pathname !== "/" ? (
                  <form onSubmit={handleSearch} className="flex-1 max-w-xl relative group hidden md:block mx-auto">
                      <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-white transition-colors" />
                          <input 
                              type="text" 
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search movies..." 
                              className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-2 pl-10 pr-10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-zinc-900 transition-all"
                          />
                          {query && (
                              <button 
                                  type="button"
                                  onClick={() => { setQuery(""); }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                              >
                                  <X className="w-4 h-4" />
                              </button>
                          )}
                      </div>
                  </form>
                ) : (
                    <div className="flex-1" />
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Mobile Search Icon Toggle */}
                    {pathname !== "/" && (
                        <button 
                            onClick={() => setIsMobileSearchOpen(true)}
                            className="md:hidden text-gray-300 hover:text-white"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    )}
                    

                    <div className="w-8 h-8 bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-white/10 hidden sm:flex">
                        <User className="w-5 h-5 text-zinc-400" />
                    </div>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden text-gray-300 hover:text-white transition-colors p-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </>
        )}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-2 duration-200">
                {navLinks.map((link) => {
                    const isActive = link.href === "/" 
                    ? pathname === "/" 
                    : pathname.startsWith(link.href);
                    
                    return (
                    <Link 
                        key={link.href}
                        href={link.href} 
                        className={cn(
                        "text-lg font-medium py-2 px-4 rounded-lg transition-colors",
                        isActive ? "bg-red-600/10 text-red-500" : "text-gray-300 hover:bg-white/5 hover:text-white"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                    );
                })}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex items-center gap-4 px-4 py-2 text-gray-300">
                     <User className="w-5 h-5" />
                     <span>Profile</span>
                </div>
            </div>
        )}
      </div>
  );
}
