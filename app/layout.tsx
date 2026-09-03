import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          TarShop<span className="text-gray-900 dark:text-white">.</span>
        </Link>
        
        {/* Navigation / Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href="/product" 
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            สินค้าทั้งหมด
          </Link>
        </div>
      </div>
    </header>
  );
}