import { fixupConfigRules } from '@eslint/compat'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import { baseConfig } from './base.mjs'

export const reactConfig = [
  ...baseConfig,
  ...fixupConfigRules(pluginReactConfig),
  { languageOptions: { globals: { ...globals.browser } } },
  { ignores: ['.next'] },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    },
  },
]
