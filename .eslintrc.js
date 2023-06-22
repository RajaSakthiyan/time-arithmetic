module.exports = {
  extends: ["eslint-config-prettier", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    es6: true,
  },
};
