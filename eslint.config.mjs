import { defineConfig, globalIgnores } from "eslint/config";
import mocha from "eslint-plugin-mocha";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
  "node_modules/*",
  "docs/*",
  "govuk_modules/*",
  "public/*",
  "app/assets/javascripts/*",
  "!app/assets/javascripts/save-progress.js",
  "app/steps/sitemap/client.js",
  "lib/*",
  "coverage/*",
  "test/crossbrowser/reports/*",
  "**/webpack.config.js",
  "**/Gruntfile.js",
  "test/end-to-end/helpers/JSWait.js",
  "functional-output/*",
  "**/acb.yaml",
  ".yarn",
  "eslint.config.mjs",
  "dist/*"
]), {
  extends: compat.extends("@hmcts"),

  plugins: {
    mocha,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.jquery,
      ...globals.mocha,
    },

    ecmaVersion: 2017,
    sourceType: "module",
  },

  rules: {
    "space-before-function-paren": ["error", {
      anonymous: "never",
      named: "never",
      asyncArrow: "always",
    }],

    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "never"],
    eqeqeq: "error",
    "require-yield": "off",
    indent: ["error", 2],
    "mocha/no-exclusive-tests": "error",

    "max-len": ["error", {
      code: 120,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreRegExpLiterals: true,
      ignorePattern: "exports.*=.*class|if \\(.*\\)|\\?.*:|\\|\\||&&",
    }],

    "no-process-env": "off",
    "no-magic-numbers": "off",
    "max-nested-callbacks": ["error", 5],
    "max-depth": ["error", 4],
    "new-cap": "off",
    "no-sync": "off",
    "max-lines": "off",
    "global-require": "off",
    "line-comment-position": "off",
    "no-throw-literal": "off",
    "object-curly-newline": "off",
    "consistent-return": "off",
    "no-invalid-this": "off",
    "no-undef": "off",
    "no-unused-expressions": "off",
    "no-prototype-builtins": "off",
    "no-undefined": "off",
    "arrow-body-style": "off",
    "func-names": "off",
    "prefer-arrow-callback": "off",
    "id-blacklist": "off",
    "guard-for-in": "off",
    "require-await": "off",
    "no-await-in-loop": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "no-useless-assignment": "off",
  },
}]);
