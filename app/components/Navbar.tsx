"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-blue-600 dark:text-blue-400">
          🛍️ TarShop
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/product"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            เลือกดูสินค้า
          </Link>
          <Link
            href="/sell"
            className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            + ลงขาย
          </Link>

          {/* ปุ่มตะกร้าสินค้า */}
          <Link
            href="/cart"
            className="relative p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-md">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}