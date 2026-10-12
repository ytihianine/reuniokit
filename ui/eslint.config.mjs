import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier/flat";

// ESLint flat config for ESLint v10
const eslintConfig = [
  // important: ignores property must be at the top level of the config array
  {
    ignores: ["node_modules/**", ".next/**", "build/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
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
      "react-hooks/set-state-in-effect": "warn", // new in react-hooks v6, to fix incrementally
      "react-hooks/immutability": "warn", // new in react-hooks v6, to fix incrementally
    },
  },
  prettierConfig,
];

export default eslintConfig;
