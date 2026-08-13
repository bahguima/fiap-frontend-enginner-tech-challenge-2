import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Options as SwcOptions } from "@swc/core";
import type { StorybookConfig } from "@storybook/react-webpack5";

const dirname = path.dirname(fileURLToPath(import.meta.url));

type Config = StorybookConfig & {
  swc?: (config: SwcOptions) => SwcOptions;
};

const config: Config = {
  stories: [
    "../apps/banking/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../libs/shared/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-swc",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../apps/banking/public"],
  swc: (swcConfig) => ({
    ...swcConfig,
    jsc: {
      ...swcConfig.jsc,
      transform: {
        ...swcConfig.jsc?.transform,
        react: {
          ...swcConfig.jsc?.transform?.react,
          runtime: "automatic",
        },
      },
    },
  }),
  webpackFinal: async (webpackConfig) => {
    webpackConfig.resolve ??= {};
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias ?? {}),
      "@banking/shared/ui": path.resolve(
        dirname,
        "../libs/shared/ui/src",
      ),
      "@": path.resolve(dirname, "../apps/banking/src"),
    };

    return webpackConfig;
  },
};

export default config;
