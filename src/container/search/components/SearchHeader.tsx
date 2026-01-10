"use client";

import Link from "next/link";
import { Movie } from "@/services/tmdb";

interface SearchHeaderProps {
    query: string;
    count: number;
}

export function SearchHeader({ query, count }: SearchHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Link href="/" className="hover:text-white transition-colors">Search</Link>
                <span>›</span>
                <span className="text-white">Movies</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Results for <span className="text-red-500">&apos;{query}&apos;</span>
            </h1>
            <p className="text-gray-400">Found {count} movies matching your criteria</p>
        </div>
    );
}
