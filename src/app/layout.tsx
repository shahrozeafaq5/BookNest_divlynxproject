import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user = null;
  if (token) user = await verifyToken(token);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Using strategy="afterInteractive" stops the parentNode/removeChild error */}
        <Script 
          src="https://unpkg.com/@tailwindcss/browser@4" 
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-[#FBFBFB] text-[#111111] antialiased selection:bg-black selection:text-white`}>
        <Navbar user={user} />
        
        {/* Everything is contained in a professional 1200px centered box */}
        <main className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-32 pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}