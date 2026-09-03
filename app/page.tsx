import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen p-4 max-w-7xl mx-auto space-y-6">
      {/* Hero Banner TarShop */}
      <section className="p-6 md:p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center shadow-lg">
        <span className="px-3 py-1 text-xs font-semibold bg-white/20 rounded-full inline-block mb-3 backdrop-blur-sm">
          Campus Marketplace
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">Welcome to TarShop</h1>
        <p className="mt-2 text-sm md:text-base opacity-90 max-w-xl mx-auto">
          ศูนย์รวมการซื้อขายสินค้ามือหนึ่ง-มือสองของคนในวิทยาลัย ซื้อง่าย ปลอดภัย นัดรับได้ทันที
        </p>
      </section>

      {/* Quick Navigation / Categories */}
      <section className="flex justify-between items-center">
        <h2 className="text-lg font-bold">สินค้ามาใหม่ใน TarShop</h2>
        <Link href="/product" className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
          ดูทั้งหมด →
        </Link>
      </section>

      {/* Grid สินค้าตัวอย่าง (Mobile 2 col, Desktop 4 col) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 hover:shadow-md transition-shadow">
          <div className="h-36 bg-gray-200 dark:bg-gray-700 w-full" />
          <div className="p-3 space-y-1">
            <h3 className="font-medium text-sm line-clamp-1">หนังสือเรียนวิชาช่าง</h3>
            <p className="text-blue-600 dark:text-blue-400 font-bold">฿150</p>
          </div>
        </div>
      </div>
    </main>
  );
}