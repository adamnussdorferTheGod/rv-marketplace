import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@components/layout/AppLayout/AppLayout';
import HomePage from '@components/pages/HomePage/HomePage';
import SearchResultsPage from '@components/pages/SearchResultsPage/SearchResultsPage';
import VehicleDetailPage from '@components/pages/VehicleDetailPage/VehicleDetailPage';
import NotFoundPage from '@components/pages/NotFoundPage/NotFoundPage';
import { ROUTES } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SEARCH} element={<SearchResultsPage />} />
          <Route path={ROUTES.LISTING} element={<VehicleDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
