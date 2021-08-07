const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
      main: path.resolve(__dirname, "./src/index.tsx")
    },
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
  ],
  devServer: {
    port: 8080,
    contentBase: "docs",
    open: true,
    hot: true
  }
};