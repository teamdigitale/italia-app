module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:sonarjs/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "import", "functional", "sonarjs"],
  rules: {
    "no-case-declarations": "off",
    "no-inner-declarations": "off",
    "prefer-const": "error",
    curly: "error",
    "spaced-comment": ["error", "always", { block: { balanced: true } }],
    radix: "error",
    "one-var": ["error", "never"],
    "object-shorthand": "error",
    "no-var": "error",
    "no-param-reassign": "error",
    "no-underscore-dangle": "error",
    "no-undef-init": "error",
    "no-throw-literal": "error",
    "no-new-wrappers": "error",
    "no-eval": "error",
    "no-console": "error",
    "no-caller": "error",
    "no-bitwise": "error",
    eqeqeq: ["error", "smart"],
    "max-classes-per-file": ["error", 1],
    "guard-for-in": "error",
    complexity: "error",
    "arrow-body-style": "error",
    "import/order": "error",
    "@typescript-eslint/no-unused-vars": "off",
    // Enable if we want to enforce the return type for all the functions
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    // TODO: added for compatibility. Removing this line we have to remove all the any usage in the code
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "generic"
      }
    ],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "@typescript-eslint/no-floating-promises": "error",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error"],
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    semi: "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/unified-signatures": "error",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-key": "error",
    "react/jsx-no-bind": ["error", { allowArrowFunctions: true }],
    "react-hooks/rules-of-hooks": "error",
    "functional/no-let": "error",
    "functional/immutable-data": "error",
    "sonarjs/no-small-switch": "off",
    "sonarjs/no-duplicate-string": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
