const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  //入口
  entry: path.resolve(__dirname, "src/login/index.js"),
  //出口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./login/index.js",
    clean: true,
  },
  //插件（给webpack提供更多功能）
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/login.html"), //模板文件
      filename: path.resolve(__dirname, "dist/login/index.html"), //输出文件
    }),
    new MiniCssExtractPlugin(), //生成css文件
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
  },
};
