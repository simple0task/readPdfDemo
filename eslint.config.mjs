import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt({
  files: ['**/*.vue', '**/*.ts'],
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-irregular-whitespace': 'off',
    'no-unused-vars': 'off', // ESLint本体のルールはoffに
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}, {
  files: ['**/*.vue'],
  rules: {
    'vue/no-multiple-template-root': 'error',
    'vue/multi-word-component-names': ['error', {
      ignores: ['Log', 'auth', 'default', 'index', 'login', 'logout', 'debug', 'info', 'log', 'Debug', 'Info'],
    }],
    'vue/require-v-for-key': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-irregular-whitespace': 'off',
  },
},
stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
}))
