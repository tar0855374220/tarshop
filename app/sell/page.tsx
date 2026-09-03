"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function SellPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "หนังสือ",
    location: "โรงอาหารกลาง",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("กรุณากรอกชื่อสินค้าและราคาให้ครบถ้วน");
      return;
    }

    // สร้างข้อมูลสินค้าใหม่
    const newProduct = {
      id: Date.now(),
      title: form.title,
      price: Number(form.price),
      category: form.category,
      location: form.location,
      description: form.description,
    };

    // ดึงสินค้าเดิมจาก localStorage (ถ้ามี)
    const existingProducts = JSON.parse(
      localStorage.getItem("tarshop_products") || "[]"
    );

    // บันทึกสินค้าใหม่ลง localStorage
    const updatedProducts = [newProduct, ...existingProducts];
    localStorage.setItem("tarshop_products", JSON.stringify(updatedProducts));

    alert("ลงขายสินค้าสำเร็จ!");
    router.push("/product"); // ส่งผู้ใช้ไปหน้าเลือกดูสินค้า
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              ➕ ลงขายสินค้าใหม่
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              กรอกข้อมูลสินค้าเพื่อส่งต่อให้เพื่อนๆ ในวิทยาลัย
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ชื่อสินค้า */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                ชื่อสินค้า <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น หนังสือช่างไฟฟ้า ปวช.1, ชุดนักเรียน"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            {/* ราคา และ หมวดหมู่ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  ราคา (บาท) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">หมวดหมู่</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="หนังสือ">หนังสือ / เอกสาร</option>
                  <option value="อุปกรณ์การเรียน">อุปกรณ์การเรียน</option>
                  <option value="เครื่องแต่งกาย">ชุดนักศึกษา / เครื่องแต่งกาย</option>
                </select>
              </div>
            </div>

            {/* จุดนัดรับ */}
            <div>
              <label className="block text-sm font-semibold mb-1">จุดนัดรับในวิทยาลัย</label>
              <select
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="โรงอาหารกลาง">โรงอาหารกลาง</option>
                <option value="หน้าตึกอำนวยการ">หน้าตึกอำนวยการ</option>
                <option value="หน้าห้องสมุด">หน้าห้องสมุด</option>
                <option value="ช่างยนต์ / โรงฝึกงาน">ช่างยนต์ / โรงฝึกงาน</option>
              </select>
            </div>

            {/* รายละเอียดเพิ่มเติม */}
            <div>
              <label className="block text-sm font-semibold mb-1">รายละเอียดเพิ่มเติม</label>
              <textarea
                rows={3}
                placeholder="ระบุสภาพสินค้า สภาพการใช้งาน หรือข้อมูลการติดต่อ..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* ปุ่มกดส่ง */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm"
            >
              🚀 ยืนยันการลงขายสินค้า
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}