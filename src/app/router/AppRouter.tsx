import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import WeatherPage from '@src/pages/WeatherPage';
import RootLayout from '@components/layout/RootLayout';
import { ROUTES_NAMES } from '@src/app/router/routes';
import { ErrorBoundary } from '@ui/ErrorBoundary';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={ROUTES_NAMES.HOME} element={<Navigate to={ROUTES_NAMES.WEATER_PAGE} replace />} />
          <Route path={ROUTES_NAMES.WEATER_PAGE} element={<ErrorBoundary><WeatherPage /></ErrorBoundary>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


