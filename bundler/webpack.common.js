const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')



module.exports = {
    // singlepage
    entry: path.resolve(__dirname, '../src/index.js'),
    output:{
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    // optimization: {
    //     usedExports: true,
    //     splitChunks: {
    //       chunks: "all",
    //     },
    // },
    plugins: [
     new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static'), }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
           
        }),
        new MiniCSSExtractPlugin()
   ],
   
    module:{
        rules:[
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: [  MiniCSSExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use:['babel-loader']
            },
            {
                test: /\.(jpe?g|png|svg|gif|ico)$/,
                type: "asset/resource",
                generator:{
                    filename:'assets/image/[hash][ext]'
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: "asset/resource",
                generator:{
                    filename:'assets/fonts/[hash][ext]'
                }
            },
            {
                test:/\.(glsl|vs|fs|vert|frag)$/,
                type: "asset/source",
                generator:{
                    filename:'shaders/[name][ext]'
                }

            }
        ]
    },
}