const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    appLog: path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["css-loader", "style-loader"],
      },
      {
        test: /\.(js|ts)$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devServer: {
    open: true,
    hot: true,
    port: 8081,
  },
  // watchOption: {
  //   // 4-5使用自动刷新，不监听node_modules目录下的文件
  //   ignored: ["**/node_modules"],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
