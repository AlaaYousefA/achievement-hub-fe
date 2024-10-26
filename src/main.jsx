import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import AuthenticationGuard from './security/AuthenticationGuard';
import RolesGuard from './security/RolesGuard';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <AuthenticationGuard>
          <RolesGuard>
            <App />
          </RolesGuard>
        </AuthenticationGuard>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
