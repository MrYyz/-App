const path = require("path");
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");
 
const webpackConfigDev = {
    devtool: 'cheap-module-eval-source-map',
    mode:'development',
    plugins:[
        new BundleAnalyzerPlugin()
    ],
    devServer:{
        contentBase: path.join(__dirname,"../public"),
        hot: true,
        host:'192.168.16.116',
        inline: true,
        port: 8080,
    }
}
module.exports = merge(webpackConfigBase, webpackConfigDev);
