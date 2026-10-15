"use client"

import Link from "next/link"
import { useSession, signOut } from "@/lib/auth-client"
import { Shield, User as UserIcon, LogOut, LogIn, Package } from "lucide-react"

export function Navbar() {
  const { data: session } = useSession()
  const user = session?.user as (Record<string, any> & { name?: string; email?: string; role?: string }) | undefined

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs tracking-tighter shadow-md group-hover:scale-105 transition-transform">
              LM
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-widest uppercase text-slate-800 font-mono">LUMIS</span>
              <span className="text-[9px] text-slate-400 -mt-1 tracking-wider uppercase">Studio Hardware</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase text-slate-400 font-medium">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Catalog</Link>
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              <span>Orders</span>
            </Link>
            <Link href="/admin" className="hover:text-amber-600 transition-colors flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Operations</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                {user.role === "ADMIN" && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">STAFF</span>
                )}
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/sign-in"
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-lg transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/auth/sign-up"
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3.5 py-1.5 rounded-lg transition-all shadow-sm shadow-indigo-200"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}