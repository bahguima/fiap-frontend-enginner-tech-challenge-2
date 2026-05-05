import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StyledComponentsRegistry } from "@/lib/styled-components-registry";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ByteBank",
  description: "Experiencia bancaria moderna para controle financeiro pessoal.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
