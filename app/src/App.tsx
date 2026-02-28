import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@components/layout/AppLayout/AppLayout';
import HomePage from '@components/pages/HomePage/HomePage';
import SearchResultsPage from '@components/pages/SearchResultsPage/SearchResultsPage';
import VehicleDetailPage from '@components/pages/VehicleDetailPage/VehicleDetailPage';
import MobileSearchPage from '@components/pages/MobileSearchPage/MobileSearchPage';
import NotFoundPage from '@components/pages/NotFoundPage/NotFoundPage';
import { TowVehicleProvider } from '@components/sections/TowVehicleSetup/TowVehicleContext';
import { CoShoppingProvider } from '@components/sections/CoShopping/CoShoppingContext';
import { ROUTES } from './routes';

function App() {
  return (
    <TowVehicleProvider>
      <CoShoppingProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.SEARCH} element={<SearchResultsPage />} />
              <Route path={ROUTES.MOBILE_SEARCH} element={<MobileSearchPage />} />
              <Route path={ROUTES.LISTING} element={<VehicleDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CoShoppingProvider>
    </TowVehicleProvider>
  );
}

export default App;
