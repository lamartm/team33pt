module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    browser: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": 0,
    "no-undef": 0,
  },
};
