import { prisma } from "@/lib/db"
import { Shield, Users, Terminal, FileText } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminPortalPage() {
  const [auditLogs, allUsers, totalOrders, totalProducts] = await Promise.all([
    prisma.auditLog.findMany({
      take: 30,
      orderBy: { timestamp: "desc" },
      include: { user: true },
    }),
    prisma.user.findMany({
      take: 12,
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count(),
    prisma.product.count(),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-mono font-medium mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>ROLE GATE: STAFF ACCESS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">Operations &amp; Security Console</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Direct ledger inspection • Audit events • Role enforcement
          </p>
        </div>
      </div>

      {/* Database Pipeline Workflow Banner */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200">
            <Terminal className="w-4 h-4 text-slate-400" />
            <span>Relational Reset &amp; Seeding Pipeline</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Automated CLI Workflow</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-700 font-mono text-xs text-emerald-400 flex items-center justify-between">
          <span>npm run db:pipeline</span>
          <span className="text-slate-500 text-[10px]">resets schema + seeds 500+ records</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>Audit Trail ({auditLogs.length} recent entries)</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Immutable ledger</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Actor</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                  <th className="px-4 py-3 font-medium">Entity</th>
                  <th className="px-4 py-3 font-medium">Record ID</th>
                  <th className="px-4 py-3 font-medium">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="px-4 py-3 text-slate-400 text-[11px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 font-sans font-medium text-slate-700">{log.user.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{log.entity}</td>
                    <td className="px-4 py-3 text-slate-400 text-[11px]">
                      {log.entityId.slice(0, 10)}...
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-[10px] max-w-xs truncate">
                      {log.metadata || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Relational Accounts Sample */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          <span>Active User Directory</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {allUsers.map((u) => (
            <div key={u.id} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-indigo-200 hover:bg-indigo-50/20 transition-colors shadow-sm">
              <div>
                <div className="font-medium text-slate-800 text-sm font-sans">{u.name}</div>
                <div className="text-xs text-slate-400 font-mono">{u.email}</div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                u.role === "ADMIN"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}>
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}