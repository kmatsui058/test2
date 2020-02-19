module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error'
    // ...
  }
};
