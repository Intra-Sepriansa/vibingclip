import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import vibingLogo from '../../assets/vibing-new.png';
import { useAuth } from '../../context/AuthContext';
import { isFirebaseReady } from '../../config/firebase';

export const RegisterPage = () => {
  const { register, loginWithGoogle, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/app';
  const firebaseReady = isFirebaseReady();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await register(name, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setLocalError(err?.message ?? 'Registrasi gagal');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-slate-950/70 backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(52,211,153,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,_rgba(99,102,241,0.12),transparent_45%)]" />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg rounded-[32px] border border-slate-800/80 bg-slate-900/85 p-8 text-slate-50 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="mb-6 flex flex-col items-center text-center">
            <img src={vibingLogo} alt="Vibing Clip" className="mb-3 h-12 w-12 rounded-2xl bg-slate-950/70 p-2" />
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Vibing Clip</p>
            <p className="mt-2 text-xl font-semibold text-white">Daftar untuk akses penuh</p>
            <p className="mt-1 text-sm text-slate-400">Free plan tersedia. Tanpa kartu kredit.</p>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={async () => {
                setLocalError(null);
                try {
                  await loginWithGoogle();
                } catch (err: any) {
                  const message = err?.message?.includes('Mengarahkan') ? 'Mengarahkan ke Google...' : err?.message;
                  setLocalError(message ?? 'Login Google gagal');
                }
              }}
              disabled={isLoading || !firebaseReady}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 transition hover:border-emerald-400/70 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-900">
                G
              </span>
              <span className="text-sm font-semibold">Daftar dengan Google</span>
            </button>

            <button
              type="button"
              disabled
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-500"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs font-semibold text-slate-900">
                
              </span>
              <span className="text-sm font-semibold">Continue with Apple (soon)</span>
            </button>

            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-slate-500">
              <div className="h-px flex-1 bg-slate-800" />
              <span>atau email</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm text-slate-300">Nama lengkap</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3 text-slate-100 outline-none ring-emerald-400/60 focus:border-emerald-400/60"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3 text-slate-100 outline-none ring-emerald-400/60 focus:border-emerald-400/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Password</label>
                <input
                  type="password"
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-3 text-slate-100 outline-none ring-emerald-400/60 focus:border-emerald-400/60"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              {(localError || error) && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                  {localError || error}
                </div>
              )}
              {!firebaseReady && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
                  Firebase belum dikonfigurasi. Isi VITE_FIREBASE_* di .env lalu restart dev server.
                </div>
              )}
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Daftar & masuk
              </Button>
            </form>

            <div className="text-center text-sm text-slate-400">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-emerald-300 hover:text-emerald-200">
                Masuk
              </Link>
            </div>
            <p className="text-center text-[11px] text-slate-500">
              Akun Anda akan memakai backend JWT. Simpan kredensial ini untuk login berikutnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
