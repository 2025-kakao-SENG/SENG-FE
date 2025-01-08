module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "airbnb",
      "airbnb-typescript",
      "prettier",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:import/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["react", "react-hooks", "@typescript-eslint", "prettier", "jsx-a11y", "import"],
    rules: {
    },
  };
  