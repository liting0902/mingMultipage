const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyPatterns = require('./CopyWebpackPlugin_Patterns.js')
const {
    merge
} = require('webpack-merge');
const commonConfig_func = require('./webpack.config.common.js');
//console.log(commonConfig)
const ENUM_BUILD_SITE = {
    ming: "ming",
    console: "console",
    demo1: "demo1",
    demo2: "demo2",
}

module.exports = (env) => {
    const devMode = (env.NODE_ENV === 'development') ? true : false
    const enum_BUILD_SITE = ENUM_BUILD_SITE[env.BUILD_SITE]
    let rtnConfig = {}
    // ========== Site Config ==============
    //config.entry.vendor = ['jquery', 'lodash'],
    switch (enum_BUILD_SITE) {
        case ENUM_BUILD_SITE.ming:
            rtnConfig = {
                entry: {
                    //[name] 的意思就是 entry 的名字
                    index: './pages/index/index.js',
                    ReactApp: './pages/ReactApp/ReactApp.js',
                },
                output: {
                    path: path.resolve(__dirname, 'dist', 'ming1'),
                    filename: devMode ? 'js/[name].bundle.js' : 'js/[chunkhash].bundle.js',
                    publicPath: '',
                    //'/ming1/multipage/dist/ming1/assets/'
                    // /ming1/multipage/dist/ming1/assets/
                },
                plugins: [
                    new MiniCssExtractPlugin({
                        filename: 'assets/[name].[hash].css',
                        //outputPath: 'assets',
                        ignoreOrder: true,
                        //publicPath:'../../assets/',
                        //filename: ({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,
                        //chunkFilename: '[id].[contenthash].css',
                    }),
                    new HtmlWebpackPlugin({
                        template: './pages/index/index.htm', //path.join(__dirname, 'src', 'index.htm'),
                        filename: './pages/index/index.bundle.htm',
                        chunks: ['index', 'ReactApp'],
                        //inject: false,
                        //base:'./dist/ming1/',
                        inject: 'true', //js插入的位置，true/'head'/'body'/false
                        // alwaysWriteToDisk: true
                        title: 'Index666',
                        hash: true,
                        myPageHeader: 'Hello World',
                        //publicPath: path.join(__dirname, 'dist', 'ming1'),

                        favicon: './assets/favicon.png', //favicon路径
                        /*
                        因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
                        https://github.com/jantimon/html-webpack-plugin/issues/870
                        */
                        //chunksSortMode: 'none',
                    }),
                    new CopyWebpackPlugin({
                        patterns: CopyPatterns
                    }),
                ],
                devServer: {
                    // aa:console.log(1111),
                    //代表的是 Web Server 運行起來的根目錄 contentBase
                    //告诉服务器从哪个目录中提供内容 也可以从多个目录提供内容
                    //contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
                    contentBase: path.resolve(__dirname, 'dist', 'ming1'),
                    // contentBasePublicPath: '/serve-content-base-at-this-url',
                    //设置为 true 时，此选项绕过主机检查 CORS
                    //disableHostCheck: true
                    compress: false,
                    port: 9006,
                    //quiet: true, // lets WebpackDashboard do its thing --quiet
                    //contentBase: './dist',
                    historyApiFallback: {
                        index: "/pages/index/index.bundle.htm",
                        // rewrites: [
                        //     // {
                        //     //     from: /^\/$/,
                        //     //     to: '/index.bundle.htm'
                        //     // },
                        //     // {
                        //     //     from: /^\/subpage/,
                        //     //     to: '/views/subpage.html'
                        //     // },
                        //     {
                        //         from: /./,
                        //         to: '/pages/index/index.bundle.htm'
                        //     }
                        // ]
                    },
                    //Enables Hot Module Replacement 
                    //hotOnly: true,
                    //启用 webpack 的 模块热替换 功能：
                    //注意，必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR
                    //hot: true,
                    //watchContentBase: true,
                    //如果 output.filename 设置为 'bundle.js' ，devServer.filename 用法如下
                    //现在只有在请求 /bundle.js 时候，才会编译 bundle。
                    //当启用 devServer.lazy 时，dev-server 只有在请求时才编译包
                    //(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为惰性模式
                    // lazy: true,
                    // filename: 'bundle.js',
                    //指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下
                    //host: '0.0.0.0'

                    //告诉 dev-server 在 server 启动后打开浏览器
                    // open: true,
                    // openPage: '/dist/index2.html',
                    //open:'Google Chrome'

                    //https: true
                    //以上设置使用了自签名证书，但是你可以提供自己的：
                    // https: {
                    //     key: fs.readFileSync('/path/to/server.key'),
                    //     cert: fs.readFileSync('/path/to/server.crt'),
                    //     ca: fs.readFileSync('/path/to/ca.pem'),
                    //   }

                    //publicPath: '/assets/'
                },
            }
            break;
        case ENUM_BUILD_SITE.console:
            //console.log(11111111111)
            rtnConfig = {
                entry: {
                    ConsoleApp: './pages/ConsoleApp/ConsoleApp.js',
                },
                //[path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.js'),],
                output: {
                    path: path.resolve(__dirname, 'dist', 'ConsoleApp'),
                    filename: devMode ? 'js/[name].bundle.js' : 'js/[chunkhash].bundle.js',
                    //filename: 'bundle.js',
                },
                plugins: [
                    new HtmlWebpackPlugin({
                        //template: path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.htm'),
                        template: './pages/ConsoleApp/ConsoleApp.htm', //path.join(__dirname, 'src', 'index.htm'),
                        filename: './pages/ConsoleApp/index.bundle.htm',
                        // template: './pages/ConsoleApp/ConsoleApp.htm', //path.join(__dirname, 'src', 'index.htm'),
                        // filename: './pages/ConsoleApp/ConsoleApp.bundle.htm',
                        chunks: ['ConsoleApp'],
                        //inject: false,
                        inject: 'body', //js插入的位置，true/'head'/'body'/false
                        // alwaysWriteToDisk: true
                        title: 'ConsoleApp666',
                        hash: true,
                        myPageHeader: 'Hello World 222',
                        favicon: './assets/favicon.png', //favicon路径
                        /*
                        因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
                        https://github.com/jantimon/html-webpack-plugin/issues/870
                        */
                        chunksSortMode: 'none',
                    }),
                    // new CopyWebpackPlugin({
                    //     patterns: [
                    //         {
                    //             from: 'js/dataDefine/',
                    //             to: './js/dataDefine',
                    //             force: false
                    //         },
                    //     ],
                    // }),
                ],
                devServer: {
                    //代表的是 Web Server 運行起來的根目錄 contentBase
                    //告诉服务器从哪个目录中提供内容 也可以从多个目录提供内容
                    //contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
                    contentBase: path.resolve(__dirname, 'dist', 'ConsoleApp'),

                    // contentBasePublicPath: '/serve-content-base-at-this-url',
                    //设置为 true 时，此选项绕过主机检查 CORS
                    //disableHostCheck: true
                    compress: false,
                    port: 9002,
                    //contentBase: './dist',
                    historyApiFallback: {
                        //index:"/index.bundle.htm"
                        index: "/pages/ConsoleApp/index.bundle.htm"

                    },

                },
            }
            break;
        case ENUM_BUILD_SITE.demo1:
            //console.log(11111111111)
            rtnConfig = {
                entry: {
                    demo1: './pages/demo1/demo1.js',
                },
                //[path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.js'),],
                output: {
                    path: path.resolve(__dirname, 'dist', 'demo1'),
                    filename: devMode ? 'js/[name].bundle.js' : 'js/[chunkhash].bundle.js',
                    //filename: 'bundle.js',
                },
                plugins: [
                    new HtmlWebpackPlugin({
                        //template: path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.htm'),
                        template: './pages/demo1/demo1.htm', //path.join(__dirname, 'src', 'index.htm'),
                        filename: './pages/demo1/index.bundle.htm',
                        // template: './pages/ConsoleApp/ConsoleApp.htm', //path.join(__dirname, 'src', 'index.htm'),
                        // filename: './pages/ConsoleApp/ConsoleApp.bundle.htm',
                        chunks: ['demo1'],
                        //inject: false,
                        inject: 'body', //js插入的位置，true/'head'/'body'/false
                        // alwaysWriteToDisk: true
                        title: 'demo1 666',
                        hash: true,
                        myPageHeader: 'Hello World demo1',
                        favicon: './assets/favicon.png', //favicon路径
                        /*
                        因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
                        https://github.com/jantimon/html-webpack-plugin/issues/870
                        */
                        chunksSortMode: 'none',
                    }),
                    // new CopyWebpackPlugin({
                    //     patterns: [
                    //         {
                    //             from: 'js/dataDefine/',
                    //             to: './js/dataDefine',
                    //             force: false
                    //         },
                    //     ],
                    // }),
                ],
                devServer: {
                    //代表的是 Web Server 運行起來的根目錄 contentBase
                    //告诉服务器从哪个目录中提供内容 也可以从多个目录提供内容
                    contentBase: path.resolve(__dirname, 'dist', 'demo1'),

                    // contentBasePublicPath: '/serve-content-base-at-this-url',
                    //设置为 true 时，此选项绕过主机检查 CORS
                    //disableHostCheck: true
                    compress: false,
                    port: 9003,
                    //contentBase: './dist',
                    historyApiFallback: {
                        //index:"/index.bundle.htm"
                        index: "/pages/demo1/index.bundle.htm"

                    },

                },
            }
            break;
        case ENUM_BUILD_SITE.demo2:
            //console.log(11111111111)
            rtnConfig = {
                entry: {
                    demo2: './pages/demo2/demo2.js',
                },
                //[path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.js'),],
                output: {
                    path: path.resolve(__dirname, 'dist', 'demo2'),
                    filename: devMode ? 'js/[name].bundle.js' : 'js/[chunkhash].bundle.js',
                    //filename: 'bundle.js',
                },
                plugins: [
                    new MiniCssExtractPlugin({
                        filename: 'assets/css/[name].[hash].css',
                    }),
                    new HtmlWebpackPlugin({
                        //template: path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.htm'),
                        template: './pages/demo2/demo2.htm', //path.join(__dirname, 'src', 'index.htm'),
                        filename: './pages/demo2/index.bundle.htm',
                        // template: './pages/ConsoleApp/ConsoleApp.htm', //path.join(__dirname, 'src', 'index.htm'),
                        // filename: './pages/ConsoleApp/ConsoleApp.bundle.htm',
                        chunks: ['demo2'],
                        //inject: false,
                        inject: 'true', //js插入的位置，true/'head'/'body'/false
                        // alwaysWriteToDisk: true
                        title: 'demo2 666',
                        hash: true,
                        myPageHeader: 'Hello World demo2',
                        favicon: './assets/favicon.png', //favicon路径
                        scriptLoading: 'defer',
                        files: {
                            css: ['a.css', 'b.css'],
                        },
                        link: 'https://awdr74100.github.io/',
                        // base: 'http://example.com/some/page.html',
                        // base : { 'href': 'http://example.com/some/page.html','target': '_blank' },
                        /*
                        因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
                        https://github.com/jantimon/html-webpack-plugin/issues/870
                        */
                        chunksSortMode: 'none',
                    }),
                    // new CopyWebpackPlugin({
                    //     patterns: [
                    //         {
                    //             from: 'js/dataDefine/',
                    //             to: './js/dataDefine',
                    //             force: false
                    //         },
                    //     ],
                    // }),
                ],
                devServer: {
                    //代表的是 Web Server 運行起來的根目錄 contentBase
                    //告诉服务器从哪个目录中提供内容 也可以从多个目录提供内容
                    contentBase: path.resolve(__dirname, 'dist', 'demo2'),

                    // contentBasePublicPath: '/serve-content-base-at-this-url',
                    //设置为 true 时，此选项绕过主机检查 CORS
                    //disableHostCheck: true
                    compress: false,
                    port: 9003,
                    //contentBase: './dist',
                    historyApiFallback: {
                        //index:"/index.bundle.htm"
                        index: "/pages/demo2/index.bundle.htm"

                    },


                },
            }
            break;
        default:
            break;
    }


    // ============== getConfig_devMode() ================
    function getConfig_devMode() {
        return {
            mode: devMode ? 'development' : 'production',
            //建议每个输出的 js 文件的大小不要超过 250k -- 暫時關閉這提醒
            performance: {
                hints: devMode ? false : 'warning'
            },
            devtool: devMode ? 'eval-cheap-module-source-map' : 'hidden-source-map',
        }
    }

    rtnConfig = merge(rtnConfig, getConfig_devMode())
    let commonConfig = commonConfig_func(devMode)
    rtnConfig = merge(commonConfig, rtnConfig)
    return rtnConfig
}