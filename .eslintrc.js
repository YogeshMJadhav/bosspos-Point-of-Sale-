const softenedPackageAndAliasRules = {
  ignore: [
    '@components',
    '@redux',
    '@lc',
    '@config',
    '@containers',
    '@App',
    '@exampleAssets',
    '@componentWrappers',
    '@lib'
  ],
}

module.exports = {
  globals: {
    System: true,
  },
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
    },
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ['react', 'flow'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'array-element-newline': ['error', 'always'],
    'react/require-default-props': 1,
    'max-len': ['error', 110],
    'jsx-a11y/anchor-is-valid': 0, // fails at using <Link to=...
    'jsx-a11y/label-has-for': 0, // fails, react uses htmlFor
    'jsx-a11y/click-events-have-key-events': 0,
    'import/no-unresolved': ['error', softenedPackageAndAliasRules],
    'import/extensions': ['error', softenedPackageAndAliasRules],
    'import/prefer-default-export': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-indent': [ 2, 2 ],
    'react/jsx-filename-extension': 0,
    'react/require-default-props': 1,
    'react/jsx-max-props-per-line': [1, { maximum: 3 }],
    'react/jsx-sort-props': 1,
    'react/jsx-curly-spacing': ['error', { when: 'always' }],
    'import/extensions': ['error', 'never', { ignorePackages: true, Record: 'never' }],
    camelcase: 0,
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx', '**/__test__/*'],
      "rules": {
        "no-set-state": "error",
        "react/no-multi-comp":  [true, { "ignoreStateless": true }]
      },
    },
  ],
}
