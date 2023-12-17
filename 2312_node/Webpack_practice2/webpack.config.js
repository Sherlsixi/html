const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

const config = {
  // mode: "development",
  entry: {
    login: path.resolve(__dirname, "src/login/index.js"),
    content: path.resolve(__dirname, "src/content/index.js"),
    publish: path.resolve(__dirname, "src/publish/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./[name]/index.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/login.html"),
      filename: path.resolve(__dirname, "dist/login/index.html"),
      useCdn: process.env.NODE_ENV === "production",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/content.html"),
      filename: path.resolve(__dirname, "dist/content/index.html"),
      useCdn: process.env.NODE_ENV === "production",
      chunks: ["content"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/publish.html"),
      filename: path.resolve(__dirname, "dist/publish/index.html"),
      useCdn: process.env.NODE_ENV === "production",
      chunks: ["publish"],
    }),
    new MiniCssExtractPlugin({
      filename: "./[name]/index.css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  //加载器 loader
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all", // 所有模块动态非动态移入的都分割分析
      cacheGroups: {
        // 分隔组
        commons: {
          // 抽取公共模块
          minSize: 0, // 抽取的chunk最小大小字节
          minChunks: 2, // 最小引用数
          reuseExistingChunk: true, // 当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
          name(module, chunks, cacheGroupKey) {
            // 分离出模块文件名
            const allChunksNames = chunks.map((item) => item.name).join("~"); // 模块名1~模块名2
            return `./js/${allChunksNames}`; // 输出到 dist 目录下位置
          },
        },
      },
    },
  },
  //解析别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
//开发环境下使用sourcemap选项
if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
}
//生产环境下使用相关配置
if (process.env.NODE_ENV === "production") {
  config.externals = {
    "bootstrap/dist/css/bootstrap.min.css": "bootstrap",
    axios: "axios",
    "form-serialize": "serialize",
    "@wangeditor/editor": "wangEditor",
  };
}
module.exports = config;
