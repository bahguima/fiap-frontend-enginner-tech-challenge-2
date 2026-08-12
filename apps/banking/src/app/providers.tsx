"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@banking/shared/auth";
import { createQueryClient } from "@banking/shared/query";
import { enableBrowserMocks } from "@banking/shared/testing/browser";
import { Toaster as Sonner } from "@banking/shared/ui/components/sonner";
import { Toaster } from "@banking/shared/ui/components/toaster";
import { TooltipProvider } from "@banking/shared/ui/components/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GlobalStyle } from "@/styles/global";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);
  const [mocksReady, setMocksReady] = useState(
    process.env.NODE_ENV !== "development" ||
      process.env.NEXT_PUBLIC_API_MOCKING !== "enabled",
  );

  useEffect(() => {
    enableBrowserMocks()
      .catch((error: Error) => {
        console.error("Não foi possível iniciar os mocks do navegador.", error);
      })
      .finally(() => {
        setMocksReady(true);
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ThemeProvider>
        <LanguageProvider>
          {mocksReady ? (
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                {children}
              </TooltipProvider>
            </AuthProvider>
          ) : (
            <p role="status">Preparando ambiente...</p>
          )}
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
