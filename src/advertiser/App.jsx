import { useState, useEffect } from 'react';
import './globals.css'; // Tailwind v4 + v0 design tokens (advertiser-scoped)
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import DesignSystemPage from './pages/DesignSystemPage';

/**
 * Advertiser ("Beat") Console — root.
 *
 * Hand-rolled hash-router so URLs survive reload + back/forward,
 * matching the simple state-switch pattern used by the retailer app.
 *
 *   #/             → DashboardPage  (main campaign performance dashboard)
 *   #/home         → HomePage       (executive overview)
 *   #/design-system → DesignSystemPage (component gallery)
 *
 * As pages are migrated to `src/ui/`, register their swap here.
 */
const ROUTES = {
  '':              DashboardPage,
  '/':             DashboardPage,
  '/home':         HomePage,
  '/design-system': DesignSystemPage,
};

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export default function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const Page = ROUTES[route] || DashboardPage;
  return <Page />;
}
