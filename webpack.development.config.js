const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const config = {
    entry: [
        './src/app',
    ],
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles/[name].css',
            allChunks: true,
            disable: false,
        })
    ],
    module: {
        rules: []
    }
}

// JavaScript
// ------------------------------------
config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules|bower_components/,
    loaders: ['react-hot-loader', 'babel-loader'],
    include: [path.join(__dirname, 'src')],
})

// Styles
// ------------------------------------
const cssLoaderConfigOptions = {
    sourceMap: true,
    minimize: {
        autoprefixer: {
            add: true,
            remove: true,
            browsers: ['last 2 versions'],
        },
        discardComments: {
            removeAll: true,
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true,
    },
}

// CSS
// ------------------------------------
config.module.rules.push({
    test: /\.(css)$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: cssLoaderConfigOptions,
            }
        ]
    })
})

// SASS/SCSS
// ------------------------------------
config.module.rules.push({
    test: /\.(sass|scss)$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: cssLoaderConfigOptions,
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                },
            }
        ],
    })
});

// Fonts
// ------------------------------------
const fonts = [
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml']
];

fonts.forEach((font) => {
    const extension = font[0]
    const mimetype = font[1]

    config.module.rules.push({
        test: new RegExp(`\\.${extension}$`),
        loader: 'file-loader',
        options: {
            name: 'styles/fonts/[name].[ext]',
            limit: 10000,
            mimetype,
        },
    })
});

module.exports = config