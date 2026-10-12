import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ESLint flat config for ESLint v9
const eslintConfig = [
  // important: ignores property must be at the top level of the config array
  {
    ignores: ["node_modules/**", ".next/**", "build/**", "next-env.d.ts"],
  },
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript", "prettier"],
  }),
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off", // temporary disables the rule
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off", // temporary
    },
  },
];

export default eslintConfig;
