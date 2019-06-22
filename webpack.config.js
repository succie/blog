const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const commonConfig = {
  entry: path.join(__dirname, "src/index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html")
    })
  ]
};

const devConfig = () => {
  return Object.assign({}, commonConfig, {
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      host: "0.0.0.0",
      port: 8080,
      historyApiFallback: true
    },
    devtool: "inline-source-map"
  });
};

const prodConfig = () => {
  return Object.assign({}, commonConfig, {
    mode: "production",
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
      splitChunks: {
        cacheGroups: {
          react: {
            name: "react",
            chunks: "all",
            test: /node_modules\/react*/
          },
          fontAwesome: {
            name: "fontawesome",
            chunks: "all",
            test: /node_modules\/@fortawesome/
          }
        }
      }
    }
  });
};

module.exports = (_, { mode }) => {
  switch (mode) {
    case "production":
      return prodConfig();
    case "development":
    default:
      return devConfig();
  }
};
