// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo TarShop */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            T
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Tar<span className="text-blue-600 dark:text-blue-400">Shop</span>
          </span>
        </Link>

        {/* Navigation & Theme Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/product"
            className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            สินค้าทั้งหมด
          </Link>

          {/* ปุ่มเปลี่ยน Dark/Light Mode */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:ring-2 hover:ring-blue-500 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}