import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Whatsapp from "./components/Whatsapp";
import { ToastContainer } from "react-toastify";
import { Providers } from "./Providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});


export const metadata = {
  title: "Temploymentz",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <Whatsapp />
          <ToastContainer position="top-right" autoClose={2000} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
