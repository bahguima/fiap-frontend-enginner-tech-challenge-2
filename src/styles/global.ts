"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap");

  :root {
    --background: 0 0% 99%;
    --foreground: 215 30% 12%;
    --card: 210 25% 96%;
    --card-foreground: 215 30% 12%;
    --popover: 0 0% 100%;
    --popover-foreground: 215 30% 12%;
    --primary: 184 80% 36%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 20% 92%;
    --secondary-foreground: 215 30% 20%;
    --muted: 210 20% 94%;
    --muted-foreground: 215 15% 40%;
    --accent: 184 80% 36%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 78% 68%;
    --destructive-foreground: 0 0% 100%;
    --border: 215 18% 88%;
    --input: 215 18% 88%;
    --ring: 184 80% 36%;
    --radius: 0.75rem;
    --sidebar-background: 210 25% 97%;
    --sidebar-foreground: 215 18% 35%;
    --sidebar-primary: 184 80% 36%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 210 20% 93%;
    --sidebar-accent-foreground: 215 30% 20%;
    --sidebar-border: 215 18% 90%;
    --sidebar-ring: 184 80% 36%;
    --rose: 0 78% 68%;
    --rose-glow: 0 80% 62%;
    --purple-glow: 184 80% 36%;
    --shadow-glow: 0 0 40px -10px hsl(184 80% 36% / 0.25);
    --shadow-rose: 0 0 40px -10px hsl(0 78% 68% / 0.25);
    --success: 158 90% 38%;
    --success-foreground: 0 0% 100%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;
    --chart-income: 158 90% 42%;
    --chart-expense: 0 78% 68%;
  }

  .dark {
    --background: 215 35% 6%;
    --foreground: 210 20% 96%;
    --card: 215 30% 10%;
    --card-foreground: 210 20% 96%;
    --popover: 215 30% 10%;
    --popover-foreground: 210 20% 96%;
    --primary: 184 80% 46%;
    --primary-foreground: 215 35% 6%;
    --secondary: 215 25% 16%;
    --secondary-foreground: 210 20% 96%;
    --muted: 215 25% 14%;
    --muted-foreground: 215 15% 65%;
    --accent: 184 80% 46%;
    --accent-foreground: 215 35% 6%;
    --destructive: 0 78% 68%;
    --destructive-foreground: 0 0% 100%;
    --border: 215 25% 18%;
    --input: 215 25% 18%;
    --ring: 184 80% 46%;
    --sidebar-background: 215 32% 8%;
    --sidebar-foreground: 210 18% 80%;
    --sidebar-primary: 184 80% 46%;
    --sidebar-primary-foreground: 215 35% 6%;
    --sidebar-accent: 215 25% 14%;
    --sidebar-accent-foreground: 210 20% 96%;
    --sidebar-border: 215 25% 16%;
    --sidebar-ring: 184 80% 46%;
    --rose: 0 78% 68%;
    --rose-glow: 0 80% 62%;
    --purple-glow: 184 80% 46%;
    --shadow-glow: 0 0 40px -10px hsl(184 80% 46% / 0.45);
    --shadow-rose: 0 0 40px -10px hsl(0 78% 68% / 0.4);
    --success: 158 85% 48%;
    --success-foreground: 215 35% 6%;
    --warning: 38 92% 55%;
    --warning-foreground: 215 35% 6%;
    --chart-income: 158 85% 50%;
    --chart-expense: 0 78% 68%;
  }

  * {
    box-sizing: border-box;
    border-color: hsl(var(--border));
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: "Outfit", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Space Grotesk", sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse-glow {
    0%,
    100% {
      opacity: 0.4;
    }

    50% {
      opacity: 0.8;
    }
  }

  @keyframes skeleton-pulse {
    50% {
      opacity: 0.5;
    }
  }
`;
