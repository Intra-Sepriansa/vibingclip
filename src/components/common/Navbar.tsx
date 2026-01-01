import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import vibingLogo from '../../assets/vibing-new.png';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAppRoute = location.pathname.startsWith('/app');
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={vibingLogo}
            alt="Vibing Clip"
            className="h-12 w-12 object-contain"
          />
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Vibing Clip</div>
            <div className="text-lg font-semibold text-white">AI Viral Clip Generator</div>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app/dashboard')}>
            Go to App
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate('/app/dashboard')}>
            Masuk
          </Button>
        </div>
      </div>
    </header>
  );
};
