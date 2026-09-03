"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

const allProducts = [
  { id: 1, title: "หนังสือช่างไฟฟ้ากำลัง ปวช.1", price: 120, location: "โรงอาหารกลาง", category: "หนังสือ" },
  { id: 2, title: "ชุดนักศึกษาชาย มือสอง สภาพ 95%", price: 200, location: "หน้าห้องสมุด", category: "เครื่องแต่งกาย" },
  { id: 3, title: "เครื่องคิดเลขวิทยาศาสตร์ Casio", price: 350, location: "หน้าตึกอำนวยการ", category: "อุปกรณ์การเรียน" },
  { id: 4, title: "ไม้ที (T-Square) สำหรับเขียนแบบ", price: 150, location: "ช่างยนต์ / โรงฝึกงาน", category: "อุปกรณ์การเรียน" },
  { id: 5, title: "รองเท้าคัทชูชาย ไซส์ 42", price: 250, location: "โรงอาหารกลาง", category: "เครื่องแต่งกาย" },
  { id: 6, title: "กระดานเขียนแบบ A3 สภาพดี", price: 400, location: "หน้าตึกอำนวยการ", category: "อุปกรณ์การเรียน" },
];

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedLocation, setSelectedLocation] = useState("ทั้งหมด");

  const filteredProducts = allProducts.filter((p) => {
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
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 sm:h-44 bg-gray-200 dark:bg-gray-800 w-full relative flex items-center justify-center text-gray-400">
                    <span className="text-xs">📸 รูปสินค้า</span>
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
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            ❌ ไม่พบสินค้าที่คุณค้นหา
          </div>
        )}
      </main>
    </div>
  );
}