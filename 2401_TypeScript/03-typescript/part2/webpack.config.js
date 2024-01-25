const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在目录
  output: {
    // 打包文件的目录
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的文件名
    filename: "bundle.js",
    clean: true,
    environment: {
      arrowFunction: false,
      const: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    corejs: "3",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node-modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env", { browsers: "last 2 versions" }],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  //配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      // title: "这是一个自定义的title",
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
