module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true
    },
    extends: [
        'eslint:recommended',

        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'indent': ['off', 4, { SwitchCase: 1 }],
        'linebreak-style': ['off', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'block-spacing': ['error', 'always'],
        // key value spacing
        // spacing between key and value in object ex: { key: value }
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        // alert for unused variables
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        // Require the use of === and !==
        'eqeqeq': 'error',
        //func-style
        // enforce the consistent use of either function declarations or expressions
        'func-style': ['error', 'expression'],
        //Enforce minimum and maximum identifier lengths
        'id-length': [
            'error',
            {
                min: 3,
                max: 30,
                exceptions: ['ok'] // Add 'ok' as an exception
            }
        ],
        // max params in function
        'max-params': ['error', 5],
        //no-nested-ternary
        // disallow nested ternary expressions
        // true ? 'yes' : false ? 'no' : 'maybe';
        'no-nested-ternary': 'error',
        //prefer-template
        // require template literals instead of string concatenation
        // 'hello, ' + name + '!'
        'prefer-template': 'error',
        //spaced-comment
        //arrow-parens
        // require parentheses around arrow function arguments
        // (x) => x
        'arrow-parens': ['error', 'always'],
        // no-multi-spaces
        // disallow multiple spaces
        // var a =  1;
        'no-multi-spaces': 'error',
        //rest-spread-spacing
        // enforce spacing between rest and spread operators and their expressions
        // [... array]
        'rest-spread-spacing': ['error', 'never'],
        // components must be single quotes aswell
        //<SecondaryButton
        //     title='Sign in with Google'
        //     iconName='google'
        //     onPress={openWebBrowser}
        //     testID="google-sign-in-button" <==== Not allowed
        // />
        'jsx-quotes': ['error', 'prefer-single'],
        // doesnt allow vars
        'no-var': 'error',
        // doesnt allow let if the variable is not reassigned
        'prefer-const': 'error',
        'no-trailing-spaces': 'error',
        'react/prop-types': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
