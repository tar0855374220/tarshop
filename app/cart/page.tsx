"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  // หาเบอร์ PromptPay ของร้านค้าแรกที่มีการระบุไว้ (เพื่อใช้สร้าง QR Code รวม)
  const defaultPromptPay = cart.find((item) => item.promptpay)?.promptpay || "0812345678";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-black flex items-center gap-2">
          🛒 ตะกร้าสินค้าของคุณ
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* รายการสินค้า */}
            <div className="md:col-span-2 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs">📸</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-500">📍 {item.location}</p>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
                        ฿{item.price}
                      </p>
                    </div>
                  </div>

                  {/* ปรับจำนวน / ลบ */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:underline pt-2 inline-block"
              >
                ล้างรายการในตะกร้าทั้งหมด
              </button>
            </div>

            {/* สรุปยอดเงิน */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 h-fit">
              <h2 className="font-bold text-base border-b border-gray-100 dark:border-gray-800 pb-3">
                สรุปคำสั่งซื้อ
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>จำนวนรวม:</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>ยอดชำระทั้งหมด:</span>
                  <span className="text-blue-600 dark:text-blue-400">฿{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckout(true)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-95"
              >
                💳 ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <div className="text-5xl">🛒</div>
            <h3 className="font-bold text-gray-700 dark:text-gray-300">ตะกร้าสินค้าว่างเปล่า</h3>
            <p className="text-xs text-gray-400">เลือกสินค้าที่คุณสนใจลงตะกร้าได้แล้ววันนี้!</p>
          </div>
        )}
      </main>

      {/* Modal สแกนจ่ายเงิน PromptPay */}
      {isCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 max-w-sm w-full rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-2xl space-y-4 text-center">
            <h3 className="font-bold text-lg">สแกนชำระเงินผ่าน PromptPay</h3>

            <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
              ฿{totalPrice}
            </p>

            <div className="flex flex-col items-center py-2">
              <img
                src={`https://promptpay.io/${defaultPromptPay}/${totalPrice}.png`}
                alt="PromptPay QR Code"
                className="w-48 h-48 rounded-xl border border-gray-200 shadow-sm"
              />
              <p className="text-xs text-gray-400 mt-2">เบอร์รับเงิน: {defaultPromptPay}</p>
            </div>

            <p className="text-xs text-gray-500">
              สแกน QR Code เพื่อชำระเงิน จากนั้นนำสลิปไปยืนยันกับผู้ขายตามจุดนัดรับที่ตกลงกันไว้
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setIsCheckout(false)}
                className="flex-1 py-2.5 bg-gray-200 dark:bg-gray-800 font-bold text-xs rounded-xl"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={() => {
                  alert("ชำระเงินสำเร็จ! ระบบได้ทำการส่งรายการเข้าสู่ขั้นตอนนัดรับแล้ว");
                  clearCart();
                  setIsCheckout(false);
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                ✅ ยืนยันการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}