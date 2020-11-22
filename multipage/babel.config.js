module.exports = {
    "presets": [
        "@babel/preset-env",
        [
            "@babel/preset-react",
            {
                "development": "true"
            }

        ]

    ],
    "sourceMaps": true,
    "plugins": [
        "@babel/plugin-proposal-class-properties",

        "transform-es2015-modules-umd"
    ]
};