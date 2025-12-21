import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import AddToCart from "@/components/cart/AddToCart";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const book = await Book.findById(id).lean();
  if (!book) return notFound();
  const data = JSON.parse(JSON.stringify(book));

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT — Product Visual */}
        <div className="bg-white p-8 border border-[#EDEDED] shadow-sm">
          <div className="relative aspect-[3/4.5] w-full shadow-2xl">
            <Image src={data.image} alt={data.title} fill className="object-cover" priority />
          </div>
        </div>

        {/* RIGHT — Product Details */}
        <div className="py-2">
          <header className="border-b border-black pb-8 mb-10">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 block mb-4">
              Archive Reference: {data._id.slice(-6)}
            </span>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight mb-4">{data.title}</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">By {data.author}</p>
          </header>

          <div className="space-y-12">
            <p className="text-[15px] leading-relaxed text-slate-600 italic">"{data.description}"</p>
            <div className="space-y-8">
               <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">${data.price}</span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">MSRP</span>
               </div>
               <div className="w-full max-w-xs bg-black text-white hover:bg-blue-600 transition-all duration-500 shadow-[10px_10px_0px_rgba(37,99,235,1)]">
                  <AddToCart bookId={data._id} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}