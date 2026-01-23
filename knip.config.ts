import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignoreBinaries: ["yamllint", "plantuml", "chktex"],
  workspaces: {
    backend: {
      project: ["src/**/*.ts"],
      ignoreDependencies: [
        "ts-loader",
        "@as-integrations/express5",
        "source-map-support",
        "@prisma/client",
      ],
    },
    frontend: {
      project: ["src/**/*.tsx", "src/**/*.ts"],
      ignore: ["src/graphql/generated.ts"],
      ignoreDependencies: ["postcss", "tailwindcss", "tw-animate-css"],
    },
  },
  ignoreIssues: {
    "frontend/src/components/ui/**": ["exports", "types"],
    "frontend/src/auth.ts": ["exports"],
  },
  ignoreDependencies: [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-plugin-deprecation",
    "globals",
    "lint-staged",
    "pino-pretty",
  ],
};

export default config;
