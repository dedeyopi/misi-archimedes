import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Engage from './pages/Engage';
import Explore from './pages/Explore';
import Concept from './pages/Concept';
import Simulation from './pages/Simulation';
import Challenge from './pages/Challenge';
import Quiz from './pages/Quiz';
import Mastery from './pages/Mastery';
import Reflect from './pages/Reflect';
import Certificate from './pages/Certificate';
import Developer from './pages/Developer';

export default function App() {
  const { data } = useApp();
  const loggedIn = !!data.student.name;

  return (
    <Routes>
      {/* Halaman Login — selalu bisa diakses */}
      <Route path="/login" element={<Login />} />

      {/* Pengantar Misi — butuh login */}
      <Route path="/" element={loggedIn ? <Landing /> : <Navigate to="/login" replace />} />

      {/* Halaman utama — butuh login */}
      <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/engage"    element={loggedIn ? <Engage />    : <Navigate to="/login" replace />} />
      <Route path="/explore"   element={loggedIn ? <Explore />   : <Navigate to="/login" replace />} />
      <Route path="/concept"   element={loggedIn ? <Concept />   : <Navigate to="/login" replace />} />
      <Route path="/simulation" element={loggedIn ? <Simulation /> : <Navigate to="/login" replace />} />
      <Route path="/challenge" element={loggedIn ? <Challenge /> : <Navigate to="/login" replace />} />
      <Route path="/quiz"      element={loggedIn ? <Quiz />      : <Navigate to="/login" replace />} />
      <Route path="/mastery"   element={loggedIn ? <Mastery />   : <Navigate to="/login" replace />} />
      <Route path="/reflect"   element={loggedIn ? <Reflect />   : <Navigate to="/login" replace />} />
      <Route path="/certificate" element={loggedIn ? <Certificate /> : <Navigate to="/login" replace />} />

      <Route path="/developer" element={<Developer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}