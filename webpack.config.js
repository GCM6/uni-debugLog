const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const sveltePreprocess = require("svelte-preprocess");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (_, arg) => {
  return {
    mode: arg.mode,
    entry: {
      appLog: path.resolve(__dirname, "src/index.ts"),
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./dist"),
      // https://webpack.docschina.org/configuration/output/#outputlibrarytype
      // 输出的模式
      library: {
        name: "AppLog",
        type: "umd",
        export: "default",
      },
    },

    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: [
            "babel-loader",
            {
              loader: "svelte-loader",
              options: {
                preprocess: sveltePreprocess({
                  sourceMap: arg.mode === "development", //开发环境为true
                  postcss: true,
                }),
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: "html-loader",
        },
        {
          test: /\.css$/,
          exclude: /svelte\.\d+\.css/,
          use: [
            // { loader: "style-loader" },
            MiniCssExtractPlugin.loader,
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: arg.mode === "development",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: /svelte\.\d+\.css/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(js|ts)$/,
          use: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".svelte"],
      mainFields: ["svelte", "browser", "module", "main"],
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
};
