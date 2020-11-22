var path = require('path')
var webpack = require('webpack')
// const ASSET_PATH = process.env.ASSET_PATH || '/';
// console.log(ASSET_PATH);
// 這邊使用 HtmlWebpackPlugin，將 bundle 好得 <script> 插入到 body
var HtmlWebpackPlugin = require('html-webpack-plugin')


//http://localhost:8080/webpack-dev-server/index.html
//const pathJS = path.join('src','js','index.js');
module.exports =  (env) => {
    //console.log(env.NODE_ENV)
    return {
        context: path.resolve(__dirname, 'src'),
        entry: [
            //use http://localhost:8080 可以直接使用webpack dev server
            //'webpack-dev-server/client?http://localhost:8080',
            path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.js'),
            //'./src/js/index.js',
            //'./src/js/ReactLifeCycle.js',
            //pathJS
        ],
        output: {
            path: path.resolve(__dirname, 'dist', 'ConsoleApp'),
            //publicPath: '/assets/',
            //publicPath: 'http://localhost:9000/images/',
            filename: 'bundle.js',
            //publicPath: ASSET_PATH,
            //publicPath: 'http://localhost:8080/scripts/',
    
        },
        node: {
            global: true,
            __filename: true,
            __dirname: true,
        },
        //在 import 模組時可以不用寫副檔名：
        // resolve: {
        //     extensions: [".js", ".jsx", ".css",'.mjs']
        // },
        mode: 'development',
        //devtool: 'cheap-module-eval-source-map',
        devtool: 'eval-cheap-module-source-map',
        //devtool: 'eval-source-map', 
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                                // minimize:true,
                                sourceMap: true,
                                //https://github.com/webpack-contrib/css-loader
                                //modules: false,
                                //modules: true,
                                //modules: 'global', // pure, local
                                modules: {
                                    mode: 'global',
                                    exportGlobals: true,
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                    context: path.resolve(__dirname, 'src'),
                                    hashPrefix: 'my-custom-hash',
                                },
                                // localIdentName:[path][name]---[local]---[hash:base64:5]
                                // modules: true,
                                // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    ]
                },
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
                            configFile:'./babel.config.js'
                            //cwd: './',
                        }
                        // options: {
                        //     presets: ["@babel/preset-env", "@babel/preset-react"],
                        //     //plugins: ["@babel/plugin-proposal-class-properties"],
                        // }
                    }
    
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
                    exclude: path.resolve(__dirname, '../src/assets/fonts'),
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'images/',
                            //emitFile: false,//不要複製到 dist/
                            //include : path.join(__dirname, 'images'),
                            //loader  : 'url-loader?limit=30000&name=images/[name].[ext]',
                        }
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
                {
                    test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                    /* Exclude images while working with fonts, e.g. .svg can be both image or font. */
                    exclude: path.resolve(__dirname, '../src/assets/images'),
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        },
                    }]
                }
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
            // new webpack.optimize.UglifyJsPlugin({
            //     compressor: {
            //         warnings: false,
            //     },
            // }),
            // new webpack.optimize.OccurenceOrderPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src','pages','ConsoleApp', 'ConsoleApp.htm'),
                filename: 'index.bundle.htm',
                // chunks: ['Home'],
                //inject: false,
                inject: 'body',
                // alwaysWriteToDisk: true
                //title: 'My App',
            }),
            // new CopyWebpackPlugin([{
            //     from: 'src/index_0.js',
            //     to: 'index_0.js'
            // }]),
            
            // new webpack.LoaderOptionsPlugin({
            //     //test: /\.mjs$/, // may apply this only for some modules
            //     options: {
            //         experiments: {
            //             mjs: true,
            //             outputModule: true,
            //             syncWebAssembly: true,
            //             topLevelAwait: true,
            //             asset: true,
            //             asyncWebAssembly: true,
            //             importAsync: true,
            //             importAwait: true,
            //         },
            //     }
            // })
    
            //new ExtractTextPlugin('styles.css'),
        ],
    
        //增加一個給devserver的設定
        devServer: {
            //代表的是 Web Server 運行起來的根目錄 contentBase
            //告诉服务器从哪个目录中提供内容 也可以从多个目录提供内容
            //contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
            contentBase: path.join(__dirname, 'dist','ConsoleApp'),
            // contentBasePublicPath: '/serve-content-base-at-this-url',
            //设置为 true 时，此选项绕过主机检查 CORS
            //disableHostCheck: true
            compress: false,
            port: 9002,
            //contentBase: './dist',
            historyApiFallback: {
                index:"/index.bundle.htm"
                // rewrites: [{
                //         from: /^\/$/,
                //         to: '/index.bundle.htm'
                //     },
                //     {
                //         from: /^\/subpage/,
                //         to: '/views/subpage.html'
                //     },
                //     {
                //         from: /./,
                //         to: '/views/404.html'
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
}

