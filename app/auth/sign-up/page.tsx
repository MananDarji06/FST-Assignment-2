"use client"

import { useState } from "react"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserPlus, ArrowRight } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await signUp.email({
        name,
        email,
        password,
      })

      if (res.error) {
        setError(res.error.message || "Registration failed")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto my-16">
      <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-lg shadow-slate-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-1 border border-indigo-100">
            <UserPlus className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Create Account</h1>
          <p className="text-xs text-slate-400 font-mono">
            Join Lumis Studio
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs p-3 rounded-xl font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-sm shadow-indigo-200 cursor-pointer"
          >
            <span>{loading ? "Creating Account..." : "Create Account"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already registered?{" "}
          <Link href="/auth/sign-in" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}