import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CrossPromotionsBar from '@components/layout/CrossPromotionsBar/CrossPromotionsBar';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      <CrossPromotionsBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
