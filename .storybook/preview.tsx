import type { Preview } from "@storybook/react";

import { ThemeProvider } from "../src/contexts/ThemeContext";
import { GlobalStyle } from "../src/styles/global";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <GlobalStyle />
        <div
          style={{
            minHeight: "100vh",
            padding: "2rem",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
