module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'max-len': ['error', 100],
		'max-params': ['error', 3],
		'indent': ['error', 'tab', {'SwitchCase': 1}],
		'no-unused-vars': 'off',
		'no-multiple-empty-lines': [
			'error',
			{'max': 1, 'maxEOF': 0},
		],
		'quotes': ['error', 'single'],
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-inferrable-types': ['off'],
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/quotes': ['error', 'single'],
		'@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
