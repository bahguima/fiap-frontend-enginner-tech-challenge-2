"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enableBrowserMocks } from "@/mocks/enable-browser-mocks";
import { areBrowserMocksEnabled } from "@/mocks/config";
import { GlobalStyle } from "@/styles/global";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [areMocksReady, setAreMocksReady] = useState(
    () => !areBrowserMocksEnabled(),
  );

  useEffect(() => {
    enableBrowserMocks()
      .then(() => setAreMocksReady(true))
      .catch(() => setAreMocksReady(true));
  }, []);

  if (!areMocksReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {children}
    </QueryClientProvider>
  );
};
