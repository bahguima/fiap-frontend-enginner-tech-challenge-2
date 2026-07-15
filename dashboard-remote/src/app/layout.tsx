import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StyledComponentsRegistry } from "@/lib/styled-components-registry";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ByteBank | Dashboard Remote",
  description: "Visão geral financeira independente do ByteBank.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
