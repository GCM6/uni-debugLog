const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const sveltePreprocess = require('svelte-preprocess');
module.exports = (env, arg) => {
  return {
  mode: arg.mode,
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
        test: /\.svelte$/,
        use: [
          'babel-loader',
            {
              loader: 'svelte-loader',
              options: {
                emitCss: true,
                preprocess: sveltePreprocess({
                  sourceMap: arg.mode === 'development',//开发环境为true
                }),
              },
            },
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|ts)$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
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
}
};
