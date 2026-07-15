"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: 0 0% 99%;
    --foreground: 215 30% 12%;
    --card: 210 25% 96%;
    --muted-foreground: 215 15% 40%;
    --border: 215 18% 88%;
    --primary: 184 80% 36%;
    --success: 158 90% 38%;
    --expense: 0 78% 68%;
    --radius: 0.75rem;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: Arial, sans-serif;
  }
`;
