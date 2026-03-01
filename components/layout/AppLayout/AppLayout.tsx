import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import CrossPromotionsBar from '@components/layout/CrossPromotionsBar/CrossPromotionsBar';
import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';
import TowVehicleModal from '@components/sections/TowVehicleSetup/TowVehicleModal/TowVehicleModal';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={styles.layout}>
      <div className={styles.fullWidth}>
        <CrossPromotionsBar />
      </div>
      <div className={styles.fullWidth}>
        <Header />
      </div>
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <div className={styles.fullWidth}>
        <Footer />
      </div>
      <TowVehicleModal />
    </div>
  );
}
