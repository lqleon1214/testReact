var webpack = require('webpack')
var path = require('path')

module.exports = {
    context: __dirname + '/src',
    entry:'./js/root.js',
    module:{
        loaders:[
            {
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                query:{
                    presets:['react','es2015'],
                    plugins:['react-html-attrs']
                }
            },
            //下面是添加css的loader，也即是css模块化的配置方法
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]'
                loader: "style-loader!css-loader"
            },
            {
                test:/\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    output:{
        path: __dirname + '/src/',
        filename:"bundle.js",
        publicPath: "http://localhost:8080/src/"
    },
}