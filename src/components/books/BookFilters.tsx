"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CATEGORIES = ["All", "Philosophy", "Poetry", "History", "Fiction", "Essays"];

export default function BookFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";
  const urlQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(urlQuery);

  const hasActiveFilters =
    Boolean(searchParams.get("q")) || Boolean(searchParams.get("category"));

  // 🔁 Sync input on back/forward nav
  useEffect(() => {
    setSearch(urlQuery);
  }, [urlQuery]);

  // ⏱ Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("q", search.trim());
      } else {
        params.delete("q");
      }

      router.push(`/books?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  // 🏷 Category handler
  function handleCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/books?${params.toString()}`);
  }

  return (
    <div className="mb-20">

      {/* 🔍 SEARCH */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title or author"
        className="mx-auto block mb-6 w-full max-w-md bg-transparent border-b border-[#8B6F47]/30 pb-3 text-lg font-serif italic text-[#2B2A28] placeholder:text-[#8B6F47]/40 outline-none text-center"
      />

      {/* 🧹 CLEAR FILTERS */}
      {hasActiveFilters && (
        <button
          onClick={() => router.push("/books")}
          className="mx-auto mb-12 block text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B6F47]/60 hover:text-[#2B2A28] transition-colors"
        >
          Clear filters
        </button>
      )}

      {/* 🏷 CATEGORY PILLS */}
      <div className="pb-6 border-b border-[#8B6F47]/20">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative group ${
                  isActive
                    ? "text-[#2B2A28]"
                    : "text-[#8B6F47]/60 hover:text-[#2B2A28]"
                }`}
              >
                {cat}

                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#8B6F47] rounded-full"
                  />
                )}

                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#2B2A28]/20 transition-all group-hover:w-full" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
