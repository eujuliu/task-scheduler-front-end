import astroPlugin from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";

export default [
  ...astroPlugin.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    rules: {},
  },
];
