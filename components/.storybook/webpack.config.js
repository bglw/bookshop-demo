const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {
    rewriteIncludes
} = require('@bookshop/jekyll-engine');

const projectRoot = path.resolve(__dirname, '../');

module.exports = async({
    config,
    mode
}) => {
    config.module.rules.push({
        test: /\.stories\.to?ml?$/,
        use: [
            '@bookshop/loader'
        ]
    });

    config.module.rules.push({
        test: /\.scss$/,
        use: [
            'style-loader', {
                loader: 'css-loader',
                options: {
                    sourceMap: false
                }
            }, {
                loader: 'resolve-url-loader',
                options: {
                    debug: false,
                    root: projectRoot,
                }
            }, {
                loader: 'sass-loader',
                options: {
                    implementation: require("node-sass")
                }
            },
            'import-glob'
        ],
        include: [
            projectRoot,
        ],
    });

    config.module.rules.push({
        test: /\.svelte$/,
        use: [
            'svelte-loader'
        ],
        include: [
            projectRoot,
        ],
    });

    config.plugins.push(
        new CopyPlugin({
            patterns: [{
                from: path.resolve(projectRoot, 'components/**/*'),
                context: path.resolve(projectRoot, 'components'),
                to: './components',
                globOptions: {
                    ignore: ['*.stories.*'],
                },
                transform(content, path) {
                    return rewriteIncludes(content);
                }
            }, {
                from: path.resolve(projectRoot, 'assets'),
                to: './assets',
                globOptions: {
                    ignore: ['*.scss'],
                }
            }]
        })
    );

    return config;
};