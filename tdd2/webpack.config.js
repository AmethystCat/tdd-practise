let path = require('path'),
    webpack = require('webpack'),
    env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(env);
console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_超华丽的分割线-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_');

/**
 * 自定义ip ，并启动服务
 * export TEST_URL=xxxxx && yarn start
 * 
 */
const getUrl = (() => {
    let argv = process.env.TEST_URL;
    // process.argv.forEach((el, index) => {
    //     if (el.indexOf('cc=') > -1) {
    //         argv = el;
    //     }
    // });
    // console.log(process.argv);
    let defaultUrl = 'http://localhost:8080';
    if (argv) return `http://${argv}`;
    else return defaultUrl;
})();

const getHost = ((url) => {
    return url.split(':')[1].split('//')[1];
})(getUrl);

console.log(getUrl);
console.log(getHost);

// dev
const config_dev = {
    entry: {
        index: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?${getUrl}`,
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'src/entry.js')
        ],
        vendors: [
            'react',
            'react-dom',
            'redux',
            'react-router'
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json', '.less']
    },
    context: path.resolve(__dirname, 'src'),
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: ['eslint-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap']
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader?sourceMap']
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                use: ['url-loader?limit=15000&name=images/[name].[ext]']
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=25000']
            }
        ]
    },
    devServer: {
        host: getHost,
        hot: true,
        inline: true,
        contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', 
            filename: 'js/vendors.js'
        }),
        new webpack.NamedModulesPlugin()
    ]
};

// test the config
// const config_dev = {
//     entry: {
//         index: [
//             'react-hot-loader/patch',
//             'webpack-dev-server/client?http://10.0.0.124:8080',
//             'webpack/hot/only-dev-server',
//             path.resolve(__dirname, 'src/entry.js')
//         ]
//     },
//     output: {
//         filename: 'js/[name].js',
//         path: path.resolve(__dirname, 'build'),
//         publicPath: '/'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 enforce: 'pre',
//                 use: ['eslint-loader']
//             },
//             {
//                 test: /\.(js|jsx)$/,
//                 use: ['babel-loader'],
//                 include: [path.resolve(__dirname, 'src')],
//                 exclude: [path.resolve(__dirname, 'node_modules')]
//             }
//         ]
//     },
//     context: path.resolve(__dirname, 'src'),
//     devServer: {
//         host: '10.0.0.124',
//         hot: true,
//         inline: true,
//         contentBase: path.resolve(__dirname, 'build'),
//         publicPath: '/'
//     },
//     plugins: [
//             new webpack.NoErrorsPlugin(),
//             new webpack.NamedModulesPlugin(),
//             new webpack.HotModuleReplacementPlugin(),
//             // new webpack.optimize.CommonsChunkPlugin({
//             //     name: 'vendors', 
//             //     filename: 'js/vendors.js'
//             // })
//         ]
// };
// var config_prod = {};

// production
const config_prod = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: [
            path.join(__dirname, 'src/entry.js')
        ],
        vendors: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    // 设置了resolve就不行，why
    // resolve: {
    //     modules: [
    //         'node_modules',
    //         path.resolve(__dirname, 'src')
    //     ],
    //     extensions: ['js', '.jsx', '.json', '.less']
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            {
                test: /.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                use: ['url-loader?limit=15000&name=images/[name].[ext]']
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=25000']
            }
        ]
    },
    context: path.resolve(__dirname, 'src'),
    plugins: [
            new ExtractTextPlugin('css/style.css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors', 
                filename: 'js/vendors.js'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
};

module.exports = (env === 'production') ? config_prod : config_dev;