module.exports = {
    "extends": ["google", "react-app", "prettier", "prettier/react"],
    // "parserOptions": {
    //     "ecmaVersion": 9,
    //     "sourceType": "module",
    //     "ecmaFeatures": {
    //         "jsx": true
    //     }
    // },
    "parser": "babel-eslint",
    "rules": {
        "strict": 0,
        "require-jsdoc": "off",
        "quotes": ["error", "double"],
        "no-invalid-this": 0,
        "babel/no-invalid-this": 1,
    },
    "plugins": [
        "babel"
    ]
};