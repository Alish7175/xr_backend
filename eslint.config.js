// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true, //Will find out ts config because of this property
            tsconfigRootDir: import.meta.dirname //ts config root directory provided here
        }
    },
    files: ['**/*.ts'], //Because of this property it will look for all the files with the .ts extension for linting
    extends: [
        // for extending the the recommended propeties. Thsi will provide set of rules that is going to be followed
        eslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        eslintConfigPrettier
    ],
    rules: {
        //We can overide th rules from here
        'no-console': 'error',
        'no-useless-catch': 0,
        quotes: ['error', 'single', { allowTemplateLiterals: true }]
    }
})
