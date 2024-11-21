const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    jquery: './src/js/jquery.js',
    scripts: './src/js/scripts.js',
    menuscript: './src/js/menuscript.js',
    bliss: './src/js/bliss.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    clean: true,
  },
  devServer: {
    static: './dist',
    host: 'localhost',
    port: 3000,
  },
  module: {
    rules: [
      // html-loader 已弃用（会影响webpackHtmlPlugin的模版语法），使用 html-webpack-plugin 插件处理模版
      // {
      //   test: /\.html$/i,
      //   // use: ['html-loader'],
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         // 只处理 <img> 标签的 src 属性，防止修改模版其他内容导致htmlwebpackplugin模版语法失效（无效）
      //         sources: {
      //           list: [
      //             {
      //               tag: 'img',
      //               attribute: 'src',
      //               type: 'src',
      //             },
      //           ],
      //         },
      //         minimize: false,
      //       },
      //     },
      //   ],
      // },
      {
        test: /jquery\.js$/,
        type: 'asset/resource',
        generator: {
          filename: 'js/[name][ext]',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
      minify: {
        removeComments: true,               // 移除注释
        collapseWhitespace: true,           // 去掉多余的空格
        // removeRedundantAttributes: true,    // 移除默认值的属性
        // useShortDoctype: true,              // 使用短的 Doctype
        // removeEmptyAttributes: true,        // 去掉空属性
        // removeStyleLinkTypeAttributes: true, // 移除 style 和 link 的 type 属性
        // keepClosingSlash: true,             // 保持单标签的闭合斜杠
        minifyJS: true,                     // 压缩内联 JS
        minifyCSS: true,                    // 压缩内联 CSS
      },    
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // 保留默认的 JavaScript 压缩器（如 TerserPlugin）
      new CssMinimizerPlugin(), // 添加 CSS 压缩插件
    ],
  },
};
