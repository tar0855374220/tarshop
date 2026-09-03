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

  const [image, setImage] = useState<string | null>(null);

  // ฟังก์ชันแปลงรูปภาพเป็น Base64 String
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("กรุณาเลือกรูปภาพที่มีขนาดไม่เกิน 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("กรุณากรอกชื่อสินค้าและราคาให้ครบถ้วน");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: form.title,
      price: Number(form.price),
      category: form.category,
      location: form.location,
      description: form.description,
      image: image || null, // บันทึกรูปภาพ (ถ้ามี)
    };

    const existingProducts = JSON.parse(
      localStorage.getItem("tarshop_products") || "[]"
    );

    const updatedProducts = [newProduct, ...existingProducts];
    localStorage.setItem("tarshop_products", JSON.stringify(updatedProducts));

    alert("ลงขายสินค้าสำเร็จ!");
    router.push("/product");
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
              กรอกข้อมูลและอัปโหลดรูปสินค้าเพื่อส่งต่อในวิทยาลัย
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* อัปโหลดรูปภาพ */}
            <div>
              <label className="block text-sm font-semibold mb-1">รูปภาพสินค้า</label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {image ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                    >
                      ❌ ลบรูป
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
                    <div className="text-3xl mb-1">📸</div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      คลิกเพื่ออัปโหลดรูปภาพ
                    </span>
                    <span className="text-xs text-gray-400">PNG, JPG ไม่เกิน 2MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

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