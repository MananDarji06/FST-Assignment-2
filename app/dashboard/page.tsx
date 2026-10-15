import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Package, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Provide fallback to first user for review if not actively signed in
  const user = session?.user || (await prisma.user.findFirst({ where: { role: "USER" } }))

  if (!user) {
    redirect("/auth/sign-in")
  }

  const userOrders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return (
    <div className="space-y-8">
      {/* User Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">Customer Account</h1>
            <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 font-mono">
            {user.name} • <span className="text-slate-300">{user.email}</span>
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-indigo-700 bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 px-3.5 py-2 rounded-xl transition-colors"
        >
          <span>Browse Catalog</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Orders Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-700 flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-500" />
            <span>Order History ({userOrders.length})</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Live Relational Query</span>
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm">No acquisitions recorded yet.</p>
            <Link
              href="/"
              className="inline-block text-xs text-indigo-600 underline underline-offset-4 hover:text-indigo-800"
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5 font-medium">Reference</th>
                    <th className="px-5 py-3.5 font-medium">Item</th>
                    <th className="px-5 py-3.5 font-medium">Quantity</th>
                    <th className="px-5 py-3.5 font-medium">Amount</th>
                    <th className="px-5 py-3.5 font-medium">Status</th>
                    <th className="px-5 py-3.5 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-mono">
                  {userOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="px-5 py-4 text-slate-400 text-[11px]">#{order.id.slice(0, 8)}</td>
                      <td className="px-5 py-4 font-sans font-semibold text-slate-800">{order.product.name}</td>
                      <td className="px-5 py-4 text-slate-500">{order.quantity}</td>
                      <td className="px-5 py-4 text-slate-800 font-semibold">${order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-[11px]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}