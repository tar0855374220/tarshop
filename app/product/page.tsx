"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

type Product = {
  id: number;
  title: string;
  price: number;
  location: string;
  category: string;
  image?: string | null;
  description?: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedLocation, setSelectedLocation] = useState("ทั้งหมด");

  // ดึงข้อมูลสินค้าที่ผู้ใช้อัปโหลดไว้ใน localStorage เท่านั้น
  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("tarshop_products") || "[]"
    );
    setProducts(savedProducts);
  }, []);

  // ฟังก์ชันสำหรับลบสินค้า
  const handleDeleteProduct = (id: number) => {
    if (confirm("คุณต้องการลบรายการสินค้านี้ใช่หรือไม่?")) {
      const updatedProducts = products.filter((item) => item.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("tarshop_products", JSON.stringify(updatedProducts));
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "ทั้งหมด" || p.category === selectedCategory;
    const matchLocation = selectedLocation === "ทั้งหมด" || p.location === selectedLocation;
    return matchSearch && matchCategory && matchLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">ตลาดสินค้า TarShop</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">ค้นหาอุปกรณ์การเรียน หนังสือ และสิ่งของในวิทยาลัย</p>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <input
            type="text"
            placeholder="🔍 ค้นหาสินค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="ทั้งหมด">📦 ทุกหมวดหมู่</option>
            <option value="หนังสือ">หนังสือ / เอกสาร</option>
            <option value="อุปกรณ์การเรียน">อุปกรณ์การเรียน</option>
            <option value="เครื่องแต่งกาย">ชุดนักศึกษา / เครื่องแต่งกาย</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="ทั้งหมด">📍 ทุกจุดนัดรับ</option>
            <option value="โรงอาหารกลาง">โรงอาหารกลาง</option>
            <option value="หน้าตึกอำนวยการ">หน้าตึกอำนวยการ</option>
            <option value="หน้าห้องสมุด">หน้าห้องสมุด</option>
            <option value="ช่างยนต์ / โรงฝึกงาน">ช่างยนต์ / โรงฝึกงาน</option>
          </select>
        </div>

        {/* Product Items */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm flex flex-col justify-between group relative"
              >
                <div>
                  <div className="h-36 sm:h-44 bg-gray-200 dark:bg-gray-800 w-full relative flex items-center justify-center text-gray-400 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs">📸 ไม่มีรูปสินค้า</span>
                    )}
                    {/* ปุ่มลบสินค้า */}
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-lg text-xs transition-opacity shadow-md"
                      title="ลบสินค้า"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="p-3 space-y-1.5">
                    <h3 className="font-semibold text-sm line-clamp-2 text-gray-800 dark:text-gray-100">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <div className="text-4xl">📦</div>
            <h3 className="font-bold text-gray-700 dark:text-gray-300">ยังไม่มีสินค้าในระบบ</h3>
            <p className="text-xs text-gray-400">กดปุ่ม "+ ลงขายสินค้า" เพื่อเริ่มเพิ่มสินค้าแรกของคุณได้เลย!</p>
          </div>
        )}
      </main>
    </div>
  );
}