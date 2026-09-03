import Link from "next/link";
import Navbar from "./components/Navbar";

const pickupLocations = [
  { id: 1, name: "โรงอาหารกลาง", icon: "🍱", desc: "โต้ะหินอ่อนฝั่งทิศตะวันออก" },
  { id: 2, name: "หน้าตึกอำนวยการ", icon: "🏛️", desc: "ใกล้วงเวียนเสาธง" },
  { id: 3, name: "หน้าห้องสมุด", icon: "📚", desc: "จุดพักคอยชั้น 1" },
  { id: 4, name: "ช่างยนต์ / โรงฝึกงาน", icon: "🔧", desc: "หน้าตึกปฏิบัติการ" },
];

const mockProducts = [
  { id: 1, title: "หนังสือช่างไฟฟ้ากำลัง ปวช.1", price: 120, location: "โรงอาหารกลาง", category: "หนังสือ" },
  { id: 2, title: "ชุดนักศึกษาชาย มือสอง สภาพ 95%", price: 200, location: "หน้าห้องสมุด", category: "เครื่องแต่งกาย" },
  { id: 3, title: "เครื่องคิดเลขวิทยาศาสตร์ Casio", price: 350, location: "หน้าตึกอำนวยการ", category: "อุปกรณ์การเรียน" },
  { id: 4, title: "ไม้ที (T-Square) สำหรับเขียนแบบ", price: 150, location: "ช่างยนต์ / โรงฝึกงาน", category: "อุปกรณ์การเรียน" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide">
              🎓 ตลาดนัดเด็กวิทยาลัย
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              TarShop
            </h1>
            <p className="text-sm sm:text-base opacity-90 leading-relaxed">
              ซื้อง่าย ขายคล่อง ส่งต่อของไม่ได้ใช้ให้รุ่นน้อง นัดรับได้ทันทีในรั้ววิทยาลัย
            </p>
            <div className="pt-2">
              <Link
                href="/product"
                className="inline-block px-5 py-2.5 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-opacity-90 shadow-md transition-all active:scale-95"
              >
                เลือกซื้อสินค้า
              </Link>
            </div>
          </div>
        </section>

        {/* Pickup Points */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            📍 จุดนัดรับยอดนิยมในวิทยาลัย
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pickupLocations.map((loc) => (
              <div
                key={loc.id}
                className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1"
              >
                <div className="text-2xl">{loc.icon}</div>
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200">{loc.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{loc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-lg sm:text-xl font-bold">🔥 สินค้ามาใหม่</h2>
            <Link href="/product" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {mockProducts.map((item) => (
              <Link
                key={item.id}
                href="/product"
                className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 sm:h-44 bg-gray-200 dark:bg-gray-800 w-full relative flex items-center justify-center text-gray-400">
                    <span className="text-xs">📸 รูปสินค้า</span>
                  </div>
                  <div className="p-3 space-y-1.5">
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-800 dark:text-gray-100 group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                      ฿{item.price}
                    </p>
                  </div>
                </div>
                <div className="p-3 pt-0 text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800/60 mt-2">
                  <span>📍 นัดรับ: {item.location}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}