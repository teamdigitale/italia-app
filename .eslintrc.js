/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
  root: true,
  env: {
    "react-native/react-native": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "@typescript-eslint/tslint",
    "react",
    "react-native",
    "import"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "no-case-declarations": "off",
    "prefer-const": "error",
    "react/prop-types": "off",
    "import/order": "error",
    // Enable if we want to enforce the return type for all the functions
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    // TODO: added for compatibility. Remove this line and fix all the any in the code
    "@typescript-eslint/no-explicit-any": "off"
  }
};
