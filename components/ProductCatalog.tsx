"use client"

import { useState, useTransition } from "react"
import { placeOrderAction } from "@/lib/actions/order-actions"
import { Search, CheckCircle, ArrowRight, Loader2 } from "lucide-react"

interface ProductItem {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
}

export function ProductCatalog({ initialProducts }: { initialProducts: ProductItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [orderingId, setOrderingId] = useState<string | null>(null)
  const [orderedNotice, setOrderedNotice] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const categories = ["All", ...Array.from(new Set(initialProducts.map((p) => p.category)))]

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleQuickOrder = (product: ProductItem) => {
    setOrderingId(product.id)
    setOrderedNotice(null)

    startTransition(async () => {
      try {
        const res = await placeOrderAction(product.id, 1)
        if (res.success) {
          setOrderedNotice(`Order confirmed for "${product.name}". Receipt recorded in database.`)
          setTimeout(() => setOrderedNotice(null), 5000)
        }
      } catch (err: any) {
        setOrderedNotice(`Note: ${err.message || "Sign in to place verified orders"}`)
        setTimeout(() => setOrderedNotice(null), 5000)
      } finally {
        setOrderingId(null)
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {orderedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 text-slate-800 px-5 py-3.5 rounded-xl shadow-2xl shadow-slate-200/80 flex items-center gap-3 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{orderedNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-y border-slate-200 py-4 bg-white/50">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-200"
                  : "bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-colors"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.slice(0, 32).map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/60"
          >
            <div>
              {/* Product Visual Mockup Container */}
              <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-100/60 flex items-center justify-center relative overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform">
                <div className="text-indigo-300 font-mono text-3xl font-bold tracking-tighter opacity-60 select-none">
                  {product.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] tracking-wider uppercase font-mono px-2 py-0.5 rounded-md bg-white/80 text-indigo-600 border border-indigo-100">
                    {product.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="text-[10px] font-mono text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-semibold text-slate-800 text-sm tracking-tight line-clamp-1 group-hover:text-indigo-700 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price & Action */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Price</span>
                <span className="text-base font-bold text-slate-800 font-mono">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => handleQuickOrder(product)}
                disabled={orderingId === product.id}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-indigo-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderingId === product.id ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Acquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}