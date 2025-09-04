import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
    },
  },
]
