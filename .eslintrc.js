module.exports = {
    "extends": ["google", "react-app", "prettier", "prettier/react"],
    "parserOptions": {
        "ecmaVersion": 9,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "require-jsdoc": "off",
        "quotes": ["error", "double"]
    }
};