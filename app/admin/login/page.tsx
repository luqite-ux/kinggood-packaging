export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/\/$/, '')
  const loginAction = adminUrl ? `${adminUrl}/api/auth/login` : '/api/auth/login'
  return <main className="flex min-h-screen items-center justify-center bg-[#071829] p-6"><div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
    <p className="text-xs font-bold uppercase tracking-widest text-[#8a5600]">KINGGOOD</p><h1 className="mt-3 text-2xl font-bold text-[#0f1b2d]">Customer administration</h1>
    {error && <p role="alert" className="mt-5 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <form action={loginAction} method="post" className="mt-6 space-y-4">
      <label className="block text-sm font-medium">Email<input name="email" type="email" required className="mt-1 w-full rounded border px-3 py-2" /></label>
      <label className="block text-sm font-medium">Password<input name="password" type="password" required className="mt-1 w-full rounded border px-3 py-2" /></label>
      <button className="w-full rounded bg-[#0d4077] px-4 py-3 font-semibold text-white">Sign in</button>
    </form></div></main>
}
