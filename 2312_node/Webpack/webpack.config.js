const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const config = {
  //打包模式（development 开发模式-使用相关内置优化）
  // mode: "development",
  //入口
  // entry: path.resolve(__dirname, "src/login/index.js"),
  entry: {
    login: path.resolve(__dirname, "src/login/index.js"),
    content: path.resolve(__dirname, "src/content/index.js"),
    publish: path.resolve(__dirname, "src/publish/index.js"),
  },
  //出口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./[name]/index.js",
    clean: true,
  },
  //插件（给webpack提供更多功能）
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/login.html"), //模板文件
      filename: path.resolve(__dirname, "dist/login/index.html"), //输出文件
      useCdn: process.env.NODE_ENV === "production",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/content.html"), //模板文件
      filename: path.resolve(__dirname, "dist/content/index.html"), //输出文件
      useCdn: process.env.NODE_ENV === "production",
      chunks: ["content"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/publish.html"), //模板文件
      filename: path.resolve(__dirname, "dist/publish/index.html"), //输出文件
      useCdn: process.env.NODE_ENV === "production",
      chunks: ["publish"],
    }),
    new MiniCssExtractPlugin({
      filename: "./[name]/index.css",
    }), //生成css文件
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
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
  //优化打包的过程
  optimization: {
    //最小化
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
    //代码分割
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
            return `./utils/${allChunksNames}`; // 输出到 dist 目录下位置
          },
        },
      },
    },
  },
  //解析
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
//开发环境下使用source map
if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
}
//生产环境下使用相关的配置
if (process.env.NODE_ENV === "production") {
  config.externals = {
    "bootstrap/dist/css/bootstrap.min.css": "bootstrap",
    axios: "axios",
    "form-serialize": "serialize",
    "@wangeditor/editor": "wangEditor",
  };
}
module.exports = config;
