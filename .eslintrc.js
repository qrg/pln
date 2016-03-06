module.exports = {
  'extends': ['eslint:recommended'],
  'rules': {
    'indent': [
      2,
      2
    ],
    'quotes': [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'semi': [
      2,
      'always'
    ],
    'no-console': 0,
    'no-unused-vars': 0,
    'no-undef': 0
  },
  'env': {
    'es6': true,
    'node': true
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  }
};
