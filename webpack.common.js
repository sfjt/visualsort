const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fromRoot = (...segments) => {
  return path.resolve(__dirname, ...segments)
};

module.exports = {
  entry: {
      main: fromRoot("src", "App.tsx")
    },
  output: {
    path: fromRoot("docs"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.png$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: fromRoot("src", "index.html")
      })
  ]
};
