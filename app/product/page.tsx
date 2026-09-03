"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

type Product = {
  id: number;
  title: string;
  price: number;
  location: string;
  category: string;
  promptpay?: string;
  contact?: string;
  description?: string;
  image?: string | null;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedLocation, setSelectedLocation] = useState("ทั้งหมด");

  // State สำหรับ Modal ชำระเงิน
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("tarshop_products") || "[]"
    );
    setProducts(savedProducts);
  }, []);

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
          <p className="text-sm text-gray-500 dark:text-gray-400">เลือกดูสินค้า นัดรับในวิทยาลัย และชำระเงินได้ง่ายๆ</p>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <input
            type="text"
            placeholder="🔍 ค้นหาสินค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
          >
            <option value="ทั้งหมด">📦 ทุกหมวดหมู่</option>
            <option value="หนังสือ">หนังสือ / เอกสาร</option>
            <option value="อุปกรณ์การเรียน">อุปกรณ์การเรียน</option>
            <option value="เครื่องแต่งกาย">ชุดนักศึกษา / เครื่องแต่งกาย</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm"
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
                  <div className="h-36 sm:h-44 bg-gray-200 dark:bg-gray-800 w-full relative flex items-center justify-center text-gray-400 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs">📸 ไม่มีรูปสินค้า</span>
                    )}
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-lg text-xs"
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">📍 {item.location}</p>
                  </div>
                </div>

                {/* ปุ่มสั่งซื้อ / ชำระเงิน */}
                <div className="p-3 pt-0">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-95"
                  >
                    💳 ชำระเงิน / สั่งซื้อ
                  </button>
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

      {/* Modal ช่องทางการชำระเงิน */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 max-w-sm w-full rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                ชำระเงิน & ติดต่อสั่งซื้อ
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <p className="font-semibold text-sm line-clamp-1">{selectedProduct.title}</p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                ฿{selectedProduct.price}
              </p>
            </div>

            {/* แสดง QR Code PromptPay ถ้ามีเบอร์ PromptPay */}
            {selectedProduct.promptpay ? (
              <div className="flex flex-col items-center space-y-2 py-2">
                <span className="text-xs font-semibold text-gray-500">
                  สแกนจ่ายผ่าน PromptPay
                </span>
                <img
                  src={`https://promptpay.io/${selectedProduct.promptpay}/${selectedProduct.price}.png`}
                  alt="PromptPay QR Code"
                  className="w-48 h-48 rounded-xl border border-gray-200 shadow-sm"
                />
                <p className="text-xs text-gray-400">เบอร์: {selectedProduct.promptpay}</p>
              </div>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-center">
                <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
                  💵 ชำระเงินสด / โอนเงินเมื่อนัดรับสินค้า
                </p>
              </div>
            )}

            {/* ช่องทางติดต่อผู้ขาย */}
            <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-2xl space-y-1 text-xs">
              <p className="font-bold text-gray-700 dark:text-gray-300">📱 ช่องทางติดต่อผู้ขาย:</p>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{selectedProduct.contact || "ไม่ได้ระบุ"}</p>
              <p className="text-gray-500 dark:text-gray-400">📍 นัดรับที่: {selectedProduct.location}</p>
            </div>

            <button
              onClick={() => {
                alert("ส่งหลักฐานหรือทักแชทหาผู้ขายผ่านช่องทางติดต่อเพื่อยืนยันนัดรับสินค้า");
                setSelectedProduct(null);
              }}
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              ✅ ติดต่อสั่งซื้อ / ส่งสลิป
            </button>
          </div>
        </div>
      )}
    </div>
  );
}