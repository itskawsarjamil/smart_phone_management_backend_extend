import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "no-unused-vars": "warn",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error"
    },
    ignores: ["**/node_modules/", "**/dist/"]
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        "process": "readonly"
      }
    }
  }, ,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
];