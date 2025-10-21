import { Linter } from "eslint";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default /** @type {Linter.FlatConfig[]} */ ([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "app/generated/prisma/**",
      "prisma/migrations/**",
      "next-env.d.ts",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      [tsPlugin.rules["no-unused-vars"].name]: ["warn", { argsIgnorePattern: "^_" }],
      [tsPlugin.rules["no-explicit-any"].name]: "off",
      [tsPlugin.rules["no-this-alias"].name]: "off",
      [tsPlugin.rules["no-require-imports"].name]: "off",
      [reactPlugin.rules["react-in-jsx-scope"].name]: "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
