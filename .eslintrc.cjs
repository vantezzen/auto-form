/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "eslint-config-prettier",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "unused-imports", "tailwindcss"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error",
    "jsx-a11y/heading-has-content": "off",
  },
};
