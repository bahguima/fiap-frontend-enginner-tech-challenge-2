import js from "@eslint/js";
import nx from "@nx/eslint-plugin";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/.next/**",
      "**/node_modules/**",
      "**/storybook-static/**",
      "**/.swc/**",
      "**/*.d.ts",
      "**/public/mockServiceWorker.js",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@nx": nx,
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allowCircularSelfDependency: true,
          allow: [
            "^\\.\\./\\.\\./tools/module-federation/shared$",
            "^\\.\\./\\.\\./\\.\\./tools/module-federation/shared$",
          ],
          depConstraints: [
            {
              sourceTag: "type:app",
              onlyDependOnLibsWithTags: ["type:shared"],
            },
            {
              sourceTag: "layer:types",
              onlyDependOnLibsWithTags: ["layer:types"],
            },
            {
              sourceTag: "layer:ui",
              onlyDependOnLibsWithTags: ["layer:ui", "layer:types"],
            },
            {
              sourceTag: "layer:data-access",
              onlyDependOnLibsWithTags: [
                "layer:data-access",
                "layer:types",
              ],
            },
            {
              sourceTag: "layer:feature",
              onlyDependOnLibsWithTags: [
                "layer:feature",
                "layer:data-access",
                "layer:types",
                "layer:ui",
              ],
            },
            {
              sourceTag: "layer:testing",
              onlyDependOnLibsWithTags: [
                "layer:testing",
                "layer:data-access",
                "layer:types",
                "layer:ui",
                "layer:feature",
              ],
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
