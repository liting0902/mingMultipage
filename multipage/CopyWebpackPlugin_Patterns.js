module.exports = CopyPatterns = [
    // {
    //     from: 'index_0.js',
    //     to: './',
    //     force: false
    // },
    {
        from: 'js/dataDefine/',
        to: './js/dataDefine',
        force: false
    },
    // {
    //     from: 'webcomponents/cusModalLogin/cusModalLogin.*',
    //     to: './',
    //     force: false,
    //     globOptions: {
    //         ignore: [
    //             // Ignore all `txt` files
    //             '**/*.use.htm',
    //             '**/*.scss',
    //             // '*.jpg',
    //             // Ignore all files in all subdirectories
    //             //'**/subdir/**',
    //         ],
    //     },
    // },
    {
        from: 'webcomponents/cusModalLogin3/cusModalLogin.htm',
        to: './webcomponents/cusModalLogin3/cusModalLogin.htm',
        force: false
    },
    // {
    //     from: 'webcomponents/cusModalLogin3/cusModalLogin.*',
    //     to: './',
    //     force: false,
    //     globOptions: {
    //         ignore: [
    //             // Ignore all `txt` files
    //             '**/*.use.htm',
    //             '**/*.scss',
    //             '**/*.css',
    //             '**/*.js',
    //             // '*.jpg',
    //             // Ignore all files in all subdirectories
    //             //'**/subdir/**',
    //         ],
    //     },
    // },
    // {
    //     from: 'assets/',
    //     to: './assets',
    //     force: false,
    //     globOptions: {
    //         // ignore: [
    //         //     // Ignore all `txt` files
    //         //     '**/*.use.htm',
    //         //     '**/*.scss',
    //         //     // '*.jpg',
    //         //     // Ignore all files in all subdirectories
    //         //     //'**/subdir/**',
    //         // ],
    //     },
    // },
    // {
    //     from: 'pages/index/index.css',
    //     to: './pages/index/index.css',
    //     force: false
    // },
    {
        from: 'webcomponents/cusModalUserProfile3/cusModalUserProfile.htm',
        to: './webcomponents/cusModalUserProfile3/cusModalUserProfile.htm',
        force: false
    },
    // {
    //     from: 'webcomponents/cusFullPageScroll',
    //     to: './pages/index',
    //     force: false,
    //     globOptions: {
    //         ignore: [
    //             // Ignore all `txt` files
    //             '**/*.htm',
    //             '**/*.css',
    //             '**/*.js',
    //             '**/*.json',
    //             '**/*.scss',
    //             // '*.jpg',
    //             // Ignore all files in all subdirectories
    //             //'**/subdir/**',
    //         ],
    //     },
    // },
    // {
    //     from: 'webcomponents/cusFullPageScroll',
    //     to: './',
    //     force: false,
    //     globOptions: {
    //         ignore: [
    //             // Ignore all `txt` files
    //             '**/*.htm',
    //             '**/*.css',
    //             '**/*.js',
    //             '**/*.json',
    //             '**/*.scss',
    //             // '*.jpg',
    //             // Ignore all files in all subdirectories
    //             //'**/subdir/**',
    //         ],
    //     },
    // },
    // {
    //     from: 'webcomponents/cusFullPageScroll/fullPageScroll.*',
    //     to: './',
    //     force: false,
    //     globOptions: {
    //         ignore: [
    //             // Ignore all `txt` files
    //             '**/*.use.htm',
    //             '**/*.scss',
    //             '**/*.png',
    //             '**/*.jpg',
    //             // '*.jpg',
    //             // Ignore all files in all subdirectories
    //             //'**/subdir/**',
    //         ],
    //     },
    // },
    {
        from: 'webcomponents/cusFullPageScroll/fullPageScroll.htm',
        to: './webcomponents/cusFullPageScroll/fullPageScroll.htm',
        force: false
    },
    // {
    //     from: 'webcomponents/cusFullPageScroll/fullPageScroll.js',
    //     to: './webcomponents/cusFullPageScroll/fullPageScroll.js',
    //     force: false
    // },
    // {
    //     from: 'webcomponents/cusFullPageScroll/fullPageScroll.css',
    //     to: './webcomponents/cusFullPageScroll/fullPageScroll.css',
    //     force: false
    // },
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
]