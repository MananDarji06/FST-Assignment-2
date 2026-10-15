import { prisma } from "@/lib/db"
import { ProductCatalog } from "@/components/ProductCatalog"
import { ArrowRight, Layers } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [userCount, productCount, orderCount, auditCount, products] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.auditLog.count(),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 60,
    }),
  ])

  return (
    <div className="space-y-14">
      {/* Editorial Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 p-8 sm:p-14 shadow-xl shadow-indigo-200/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-white/20 text-white border border-white/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>Studio Series • Catalog 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Objects designed for quiet focus and longevity.
          </h1>

          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            A curated suite of tactile workstation hardware, acoustic modules, and archival tools.
            Engineered with durable materials and structured relational precision.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-indigo-700 font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-black/10"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-xl border border-white/30 text-sm transition-all"
            >
              <span>View Your Orders</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="catalog" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Curated Equipment
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Displaying {products.length} registered catalog items
            </p>
          </div>
        </div>

        <ProductCatalog initialProducts={products} />
      </section>

      {/* Infrastructure Health Panel */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500">
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Core Data Architecture &amp; Telemetry</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>All Systems Nominal</span>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Registered Accounts</span>
            <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{userCount}</div>
            <span className="text-[10px] text-slate-400">Auth Sessions Active</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Active Inventory</span>
            <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{productCount}</div>
            <span className="text-[10px] text-slate-400">Normalized Units</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Transactions</span>
            <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{orderCount}</div>
            <span className="text-[10px] text-slate-400">Orders Processed</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Security Events</span>
            <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{auditCount}</div>
            <span className="text-[10px] text-slate-400">Immutable Audit Logs</span>
          </div>
        </div>
      </section>
    </div>
  )
}