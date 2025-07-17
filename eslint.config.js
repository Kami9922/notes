import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
				project: './tsconfig.json', // если используете правила, требующие типизации
			},
			globals: globals.browser,
		},
		plugins: {
			'@typescript-eslint': tseslint.plugins['@typescript-eslint'],
			reactHooks,
			reactRefresh,
			import: importPlugin,
			'unused-imports': unusedImports,
		},
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
			'plugin:import/errors',
			'plugin:import/warnings',
			'plugin:import/typescript',
			'prettier', // если используете prettier
		],
		rules: {
			// Удаление неиспользуемых импортов
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],

			// Пример правил кодстайла
			semi: ['error', 'always'],
			quotes: ['error', 'single', { avoidEscape: true }],
			indent: ['error', 2],
			'no-console': 'warn',

			// Правила для импортов
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
		},
		settings: {
			'import/resolver': {
				typescript: {},
			},
		},
	},
])
