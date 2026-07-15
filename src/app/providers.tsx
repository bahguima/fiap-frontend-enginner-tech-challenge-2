"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { enableBrowserMocks } from "@/mocks/enable-browser-mocks";
import { areBrowserMocksEnabled } from "@/mocks/config";
import { GlobalStyle } from "@/styles/global";

export function Providers({ children }: { children: ReactNode }) {
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
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
