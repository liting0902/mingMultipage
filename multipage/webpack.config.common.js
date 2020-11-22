var path = require('path')
var webpack = require('webpack')
// const ASSET_PATH = process.env.ASSET_PATH || '/';
// console.log(ASSET_PATH);
// 這邊使用 HtmlWebpackPlugin，將 bundle 好得 <script> 插入到 body
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const devMode = Boolean(process.env.WEBPACK_SERVE)
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//babel-plugin-transform-remove-console
// module.exports = {
//     plugins: process.env.NODE_ENV==='production' ? ["transform-remove-console"] : []
//   }
// plugins = () => {
//     const defaultPlugins = ["existing-plugin-1"];
//     if (process.env.NODE_ENV === "production") {
//       defaultPlugins.push("transforma-remove-console");
//     }
//   }
const TerserPlugin = require('terser-webpack-plugin');


//http://localhost:8080/webpack-dev-server/index.html
//const pathJS = path.join('src','js','index.js');
module.exports = (devMode) => {
    return {
        context: path.resolve(__dirname, 'src'),
        output: {
            pathinfo: devMode ? true : false,
        },
        // entry: {
        //     //[name] 的意思就是 entry 的名字
        //     index: './pages/index/index.js',
        //     ConsoleApp: './pages/ConsoleApp/ConsoleApp.js',
        //     ReactApp: './pages/ReactApp/ReactApp.js',
        //     // vendor: ['jquery', 'lodash'],
        // },
        // output: {
        //     path: path.resolve(__dirname, 'dist', 'ming1'),
        //     //path: './dist/',
        //     //publicPath: '/assets/',
        //     //publicPath: 'http://localhost:9000/images/',
        //     //filename: 'bundle.js',
        //     //chunkFilename: '[name].bundle.js',
        //     //[name] ，它會被 entry 中的 key 換掉
        //     //[chunkhash] 則可讓瀏覽器知道是否需要重新載入檔案
        //     //filename: 'js/[name].[chunkhash].bundle.js',
        //     //filename: devMode ? 'js/[name].bundle.js' : 'js/[chunkhash].bundle.js',
        //     filename: 'js/[name].bundle.js',
        //     //output.publicPath The publicPath specifies the public URL address of the output files
        //     //publicPath: "",
        //     //publicPath: ASSET_PATH,
        //     //publicPath: 'http://localhost:8080/scripts/',

        // },
        optimization: {
            moduleIds: devMode? 'named': 'deterministic',
            chunkIds: devMode? 'named': 'deterministic',
            mangleExports: devMode?false:'deterministic',
            nodeEnv: devMode?'development':'production',
            flagIncludedChunks: devMode?false:true,
            //occurrenceOrder: devMode?false:true,
            concatenateModules: devMode?false:true,

            // 在這裡使用 SplitChunksPlugin
            splitChunks: {
                hidePathInfo: devMode?false:true,
                
                // cacheGroups: {
                //     // 把所有 node_modules 內的程式碼打包成一支 vendors.bundle.js
                //     vendors: {
                //         test: /[\\/]node_modules[\\/]/i,
                //         name: 'vendors',
                //         chunks: 'all',
                //     },
                // },
                /*
                默认 entry 的 chunk 不会被拆分
                因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
                所以我们可以配置成 all, 把 entry chunk 也拆分了
                */
                chunks: 'all',
                //minSize：程式檔案壓縮前如果大於minSize才進行分割，如果沒有會包到同一個檔案。
                minSize: 80000,
                //minSize: 30000,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                //從抽取出來的文件自動抓取檔名，而檔名和檔名之間默認的連接符號為~
                automaticNameDelimiter: '_'
            },
            emitOnErrors: devMode?true:false,
            // 把 webpack runtime 也打包成一支 runtime.bundle.js
            runtimeChunk: {
                name: 'runtime',
            },
            minimize: devMode ? false : true,
            minimizer: devMode ? [] : [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    //cache: true,
                    // parallel: true,
                    // sourceMap: devMode ? true : false,
                    //parallel: 4,
                    //comments shall be extracted to a separate file
                    //extractComments: 'all',
                    terserOptions: {
                        //cache: true,
                        //parallel: true,
                        sourceMap: false,
                        // sourceMap: devMode ? true : false,
                        compress: {
                            //drop_console: true,
                            pure_funcs: ['console.log', 'console.info', 'console.debug'], // 'console.warn' , 'console.error'
                        }
                        // compress: {
                        //     drop_console: true,
                        // }
                        // ecma: undefined,
                        // parse: {},
                        // compress: {},
                        // mangle: true, // Note `mangle.properties` is `false` by default.
                        // module: false,
                        // // Deprecated
                        // output: null,
                        // format: null,
                        // toplevel: false,
                        // nameCache: null,
                        // ie8: false,
                        // keep_classnames: undefined,
                        // keep_fnames: false,
                        // safari10: false,
                    },
                })
            ],
        },
        node: {
            global: true,
            __filename: true,
            __dirname: true,
        },
        //建议每个输出的 js 文件的大小不要超过 250k -- 暫時關閉這提醒
        performance: {
            hints: devMode ? false : 'warning'
            //hints: 'warning'
        },
        //在 import 模組時可以不用寫副檔名：
        // resolve: {
        //     extensions: [".js", ".jsx", ".css",'.mjs']
        // },
        //mode: 'development',
        mode: devMode ? 'development' : 'production',
        //devtool: 'cheap-module-eval-source-map',
        //devtool: 'eval-cheap-module-source-map',
        devtool: 'eval-cheap-module-source-map', //'hidden-source-map',
        //devtool: 'eval-source-map', 
        resolve: {
            modules: ["node_modules"],
            alias: {
                client: path.join(__dirname, "../src/client"),
                server: path.join(__dirname, "../src/server")
            },
            extensions: [".js", ".json", ".scss"]
            //extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [
                        // {
                        //     loader: 'style-loader'
                        // },
                        MiniCssExtractPlugin.loader, //'css-loader'
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                                // minimize:true,
                                url: true,
                                sourceMap: true,
                                //https://github.com/webpack-contrib/css-loader
                                //modules: false,
                                //modules: true,
                                //modules: 'global', // pure, local
                                modules: {
                                    mode: 'global',
                                    //exportGlobals: true,
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                    context: path.resolve(__dirname, 'src'),
                                    hashPrefix: 'my-custom-hash',
                                },
                                // localIdentName:[path][name]---[local]---[hash:base64:5]
                                // modules: true,
                                // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        },
                    ]
                },
                //var ExtractTextPlugin = require("extract-text-webpack-plugin");
                //     {
                //         test: /\.css$/,
                //         use: ExtractTextPlugin.extract({
                //           fallback: "style-loader",
                //           use: "css-loader"
                //         })
                //       },...
                //     ]
                //   },
                //   plugins: [
                //     new ExtractTextPlugin({
                //       filename: "style.css"
                //     })
                //   ]


                // {
                //     test: /\.(png|svg|jpg|gif)$/,
                //     use: 'file-loader'
                // }
                {
                    test: /\.(js|jsx|mjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            //compact: true,
                            //configFile: './.babelrc.json'
                            configFile: './babel.config.js'
                            //cwd: './',
                        }
                        // options: {
                        //     presets: ["@babel/preset-env", "@babel/preset-react"],
                        //     //plugins: ["@babel/plugin-proposal-class-properties"],
                        // }
                    }

                },
                // {
                //     test: /\.(jpe?g|png|gif|svg)$/i,
                //     /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
                //     exclude: path.resolve(__dirname, '../src/assets/fonts'),
                //     use: [{
                //         loader: 'file-loader',
                //         options: {
                //             /*
                //             name：指定文件输出名
                //             [hash] 为源文件的hash值，[ext] 为后缀。
                //             */
                //             name: '[name]-[hash].[ext]',
                //             outputPath: 'assets/images/',
                //             //emitFile: false,//不要複製到 dist/
                //             //include : path.join(__dirname, 'images'),
                //             //loader  : 'url-loader?limit=30000&name=images/[name].[ext]',
                //         }
                //     }]
                // },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                    // file-loader 用以將靜態資源載入到 Webpack 內，並且解析資源的相互依賴關係，最後 output 到指定的位置，
                    // 而 url-loader 用以將指定大小上限內的圖片資源轉換為 base64 格式，如遇到超過上限的資源，
                    // 將 fallback 給 file-loader 做處理，兩者功能並沒有衝突，由於處理對象相同，導致很多人會搞混，
                    // 通常兩個 loader 都是一起使用居多，並且直接設置 url-loader 即可
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets',
                        limit: 8192,
                        // 超過大小時調用 file-loader 處理該檔案
                        //指定當文件大小超過 limit 限制時，需轉向的加載程序，默認為 file-loader
                        fallback: require.resolve('file-loader'),
                        // 修改公共路徑
                        // publicPath: '',
                        publicPath: './',
                        // postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
                    },
                },
                // for bootstrap
                {
                    test: /\.(scss)$/,
                    use: [{
                        loader: 'style-loader', // inject CSS to page
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }]
                },
                // {
                //     test: /\.(jpe?g|png|gif|svg)$/,
                //     use: [{
                //         loader: 'url-loader',
                //         options: {
                //             limit: 40000 /* 小於 40kB 的圖片轉成 base64 */
                //         }
                //     }]
                // },

                // {
                //     test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                //     /* Exclude images while working with fonts, e.g. .svg can be both image or font. */
                //     exclude: path.resolve(__dirname, '../src/assets/images'),
                //     use: [{
                //         loader: 'file-loader',
                //         options: {
                //             name: '[name].[ext]',
                //             outputPath: 'fonts/'
                //         },
                //     }]
                // }

                // //第一個loader編譯JSX
                // {
                //     test: /.js$/,
                //     exclude: /node_modules/,
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: ['@babel/preset-react']
                //         }
                //     }
                // },
                // //第二個loader編譯ES6
                // {
                //     test: /.js$/,
                //     exclude: /node_modules/,
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: ['@babel/preset-env']
                //         }
                //     }
                // }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            //new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         // 不顯示壓縮時的警告
            //         warnings: false,
            //         // drop_debugger: devMode ? 'false' : 'true',
            //         // drop_console: devMode ? 'false' : 'true',
            //         // pure_funcs: devMode ? []: ['console.log'], // 移除console
            //         drop_console:true,
            //         //parse: {},
            //         // 移除沒有使用到的變數與function
            //         //compress: {},
            //         //ie8: false
            //     },
            //     parallel: true
            // }),
            //new DashboardPlugin(dashboard.setData),

            // new webpack.optimize.UglifyJsPlugin({
            //     compressor: {
            //         warnings: false,
            //     },
            // }),
            // new webpack.optimize.OccurenceOrderPlugin(),
            // new HtmlWebpackPlugin({
            //     template: './pages/index/index.htm', //path.join(__dirname, 'src', 'index.htm'),
            //     filename: './pages/index/index.bundle.htm',
            //     chunks: ['index', 'ReactApp'],
            //     //inject: false,
            //     inject: 'body', //js插入的位置，true/'head'/'body'/false
            //     // alwaysWriteToDisk: true
            //     title: 'Index666',
            //     hash: true,
            //     myPageHeader: 'Hello World',
            //     favicon: './assets/favicon.png', //favicon路径
            //     /*
            //     因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
            //     https://github.com/jantimon/html-webpack-plugin/issues/870
            //     */
            //     chunksSortMode: 'none',
            // }),
            // new HtmlWebpackPlugin({
            //     template: './pages/ConsoleApp/ConsoleApp.htm', //path.join(__dirname, 'src', 'index.htm'),
            //     filename: './pages/ConsoleApp/ConsoleApp.bundle.htm',
            //     chunks: ['ConsoleApp'],
            //     //inject: false,
            //     inject: 'body',
            //     // alwaysWriteToDisk: true
            //     title: 'ConsoleApp666',
            //     /*
            //     因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
            //     https://github.com/jantimon/html-webpack-plugin/issues/870
            //     */
            //     chunksSortMode: 'none',
            // }),

            // new CopyWebpackPlugin({
            //     patterns: [
            //         // {
            //         //     from: 'index_0.js',
            //         //     to: './',
            //         //     force: false
            //         // },
            //         {
            //             from: 'js/dataDefine/',
            //             to: './js/dataDefine',
            //             force: false
            //         },
            //         {
            //             from: 'webcomponents/cusModalLogin/cusModalLogin.htm',
            //             to: './webcomponents/cusModalLogin/cusModalLogin.htm',
            //             force: false
            //         },
            //         {
            //             from: 'webcomponents/cusModalUserProfile/cusModalUserProfile.htm',
            //             to: './webcomponents/cusModalUserProfile/cusModalUserProfile.htm',
            //             force: false
            //         },
            //         // new CopyWebpackPlugin([{
            //         //     from: 'src/index_0.js',
            //         //     to: 'index_0.js'
            //         // }]),

            //         // new webpack.LoaderOptionsPlugin({
            //         //     //test: /\.mjs$/, // may apply this only for some modules
            //         //     options: {
            //         //         experiments: {
            //         //             mjs: true,
            //         //             outputModule: true,
            //         //             syncWebAssembly: true,
            //         //             topLevelAwait: true,
            //         //             asset: true,
            //         //             asyncWebAssembly: true,
            //         //             importAsync: true,
            //         //             importAwait: true,
            //         //         },
            //         //     }
            //         // })

            //         //new ExtractTextPlugin('styles.css'),
            //     ],
            // }),
        ],
        //增加一個給devserver的設定
        // devServer: {
        //     //代表的是 Web Server 運行起來的根目錄 contentBase
        //     //告诉服务器从哪个目录中提供内容 也可以从多个目录提供内容
        //     //contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
        //     contentBase: path.resolve(__dirname, 'dist', 'ming1'),
        //     // contentBasePublicPath: '/serve-content-base-at-this-url',
        //     //设置为 true 时，此选项绕过主机检查 CORS
        //     //disableHostCheck: true
        //     compress: false,
        //     port: 9006,
        //     //quiet: true, // lets WebpackDashboard do its thing --quiet
        //     //contentBase: './dist',
        //     historyApiFallback: {
        //         index: "/pages/index/index.bundle.htm"
        //         // rewrites: [{
        //         //         from: /^\/$/,
        //         //         to: '/index.bundle.htm'
        //         //     },
        //         //     {
        //         //         from: /^\/subpage/,
        //         //         to: '/views/subpage.html'
        //         //     },
        //         //     {
        //         //         from: /./,
        //         //         to: '/views/404.html'
        //         //     }
        //         // ]
        //     },
        //     //Enables Hot Module Replacement 
        //     //hotOnly: true,
        //     //启用 webpack 的 模块热替换 功能：
        //     //注意，必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR
        //     //hot: true,
        //     //watchContentBase: true,
        //     //如果 output.filename 设置为 'bundle.js' ，devServer.filename 用法如下
        //     //现在只有在请求 /bundle.js 时候，才会编译 bundle。
        //     //当启用 devServer.lazy 时，dev-server 只有在请求时才编译包
        //     //(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为惰性模式
        //     // lazy: true,
        //     // filename: 'bundle.js',
        //     //指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下
        //     //host: '0.0.0.0'

        //     //告诉 dev-server 在 server 启动后打开浏览器
        //     // open: true,
        //     // openPage: '/dist/index2.html',
        //     //open:'Google Chrome'

        //     //https: true
        //     //以上设置使用了自签名证书，但是你可以提供自己的：
        //     // https: {
        //     //     key: fs.readFileSync('/path/to/server.key'),
        //     //     cert: fs.readFileSync('/path/to/server.crt'),
        //     //     ca: fs.readFileSync('/path/to/ca.pem'),
        //     //   }

        //     //publicPath: '/assets/'
        // },

        /*
        配置开发时用的服务器，让你可以用 http://127.0.0.1:8080/ 这样的 url 打开页面来调试
        并且带有热更新的功能，打代码时保存一下文件，浏览器会自动刷新。比 nginx 方便很多
        如果是修改 css, 甚至不需要刷新页面，直接生效。这让像弹框这种需要点击交互后才会出来的东西调试起来方便很多。
        因为 webpack-cli 无法正确识别 serve 选项，使用 webpack-cli 执行打包时会报错。
        因此我们在这里判断一下，仅当使用 webpack-serve 时插入 serve 选项。
        issue：https://github.com/webpack-contrib/webpack-serve/issues/19
        */
        // if (devMode) {
        //     module.exports.serve = {
        //         // 配置监听端口，默认值 8080
        //         port: 8080,
        //         host: '0.0.0.0',
        //          dev: {
        //              /*
        //              指定 webpack-dev-middleware 的 publicpath
        //              一般情况下与 output.publicPath 保持一致（除非 output.publicPath 使用的是相对路径）
        //              https://github.com/webpack/webpack-dev-middleware# publicpath
        //              */
        //              publicPath: '/assets/'
        //          },
        //         // add: 用来给服务器的 koa 实例注入 middleware 增加功能
        //         add: app => {
        //             /*
        //             配置 SPA 入口
        //             SPA 的入口是一个统一的 html 文件，比如
        //             http://localhost:8080/foo
        //             我们要返回给它
        //             http://localhost:8080/index.html
        //             这个文件
        //             */
        //             app.use(convert(history()))
        //         }
        //     }
        // }

        //开发环境允许其他电脑访问
        // const internalIp = require('internal-ip')
        // module.exports.serve = {
        //     host: '0.0.0.0',
        //     hot: {
        //         host: {
        //             client: internalIp.v4.sync(),
        //             server: '0.0.0.0'
        //         }
        //     },
        //     // ...
        // }
    }
}