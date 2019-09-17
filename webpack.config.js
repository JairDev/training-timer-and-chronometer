const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({  
      template: "./src/index.html",
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true
      // }
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    })
  ],

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/",
              useRelativePath: true,
            }
          }
        ]
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "sound/",
              useRelativePath: true,
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ],
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.(sa|sc|c)ss$/,
  //       use: [
  //         MiniCSSExtractPlugin.loader,
  //         "css-loader",
  //         "sass-loader"
  //       ]
  //     },
  //     {
  //       test: /\.(jpg|png|jpeg)$/,
  //       use: [
  //         {
  //           loader: "file-loader",
  //           options: {
  //             name: "[name].[ext]",
  //             outputPath: "./static/",
  //             useRelativePath: true,
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       test: /\.m?js$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env'],
  //         }
  //       }
  //     }
  //   ]
  // }
}