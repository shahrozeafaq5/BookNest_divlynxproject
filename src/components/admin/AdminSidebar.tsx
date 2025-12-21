"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/books", label: "Books" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/books", label: "View Store" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold">BookNest Admin</h2>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-3 py-2 transition ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
