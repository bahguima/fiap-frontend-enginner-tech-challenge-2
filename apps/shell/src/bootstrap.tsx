import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ShellProviders } from './components/ShellProviders';
import { enableBrowserMocks } from '@banking/shared/testing/browser';

const container = document.getElementById('root');
if (!container) throw new Error('#root element not found');

const renderApplication = async () => {
  await enableBrowserMocks();

  createRoot(container).render(
    <StrictMode>
      <ShellProviders>
        <App />
      </ShellProviders>
    </StrictMode>
  );
};

void renderApplication();
