module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  extends: ['next/core-web-vitals', 'next/typescript'],
  env: {
    browser: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/naming-convention': 'off',
    'react/prop-types': 'off',
    'no-process-env': 'off',
    'array-callback-return': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/anchor-is-valid': 'off'
  }
}
