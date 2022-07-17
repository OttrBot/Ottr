module.exports = {
    "extends": [
        "eslint:recommended",
        "prettier",
    ],

    "env": {
        "node": true,
        "es6": true,
    },

    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["error", "CRLF"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],
        "for-direction": "off",
        "no-trailing-spaces": ["error"],
    }
}