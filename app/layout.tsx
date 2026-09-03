import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "TarShop - ตลาดนัดวิทยาลัย",
  description: "ซื้อขายของมือสอง นัดรับง่ายในวิทยาลัย",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}