module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // Disable TypeScript rules
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Disable React rules
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-no-undef': 'off',

    // Disable Next.js rules
    '@next/next/no-img-element': 'off',

    // Disable other rules
    'import/no-anonymous-default-export': 'off',
    'no-unused-vars': 'off'
  }
};
