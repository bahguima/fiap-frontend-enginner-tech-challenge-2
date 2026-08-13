import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@banking/shared/auth';
import { createQueryClient } from '@banking/shared/query';
import { enableBrowserMocks } from '@banking/shared/testing/browser';
import DashboardApp from './App';

const container = document.getElementById('root');
if (!container) throw new Error('#root element not found');

const standaloneQueryClient = createQueryClient();
const shellLoginUrl = `${process.env.SHELL_PUBLIC_URL ?? 'http://127.0.0.1:4200'}/login`;

const renderApplication = async () => {
  await enableBrowserMocks();

  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={standaloneQueryClient}>
        <AuthProvider>
          <DashboardApp loginUrl={shellLoginUrl} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

void renderApplication();
