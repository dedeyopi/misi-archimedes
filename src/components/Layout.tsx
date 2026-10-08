import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NAV = [
  ['/dashboard', '🏠', 'Beranda'],
  ['/explore', '🧪', 'Lab'],
  ['/concept', '💡', 'Konsep'],
  ['/challenge', '🚢', 'Tantangan'],
  ['/quiz', '📝', 'Evaluasi']
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, progress } = useApp();
  const name = data.student.name || 'Siswa';

  return (
    <>
      <header className="topbar no-print">
        <div className="topbar-in">
          <Link className="brand" to="/dashboard">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 3v9M12 3l5 3-5 3" stroke="#0369a1" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
            Misi Archimedes
          </Link>
          <nav className="nav" aria-label="Navigasi utama">
            {NAV.map(([to, , label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
            ))}
            <NavLink to="/mastery" className={({ isActive }) => isActive ? 'active' : ''}>Hasil</NavLink>
          </nav>
          <div className="student-chip">
            <span>👋 {name}</span>
            <span className="pct">{progress}%</span>
          </div>
        </div>
      </header>
      <main className="page"><div className="wrap stack">{children}</div></main>
      <nav className="bnav no-print" aria-label="Navigasi bawah">
        <div className="bnav-in">
          {NAV.map(([to, ico, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
              <span>{ico}</span>{label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}