const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/*
  .resolve() => 絶対パスを生成するメソッド
  __dirname => このディレクトリまでの絶対パス を 第2引数のpathと結合してる
*/
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/index.js', // entryファイルは相対パスで指定
  // outputは絶対パスで指定
  output: {
    filename: 'main.js',
    path: outputPath, // main.jsまでの絶対パス
  },
  // moduleことの設定
  module: {
    rules: [
      {
        enforce: 'pre', // enforceキーを指定してないloaderより先に処理される
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      // jsファイルを対象
      {
        test: /\.jsx?$/,
        // node_modulesはトランスパイルの対象に含めない
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // sass/cssを対象
      {
        test: /\.(sc|c)ss$/, // .scssファイルを対象
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }, // sass
      // 画像ファイル関連
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i, // iは大文字も許容
        loader: 'url-loader',
        options: {
          // 2KB以上のファイルのsrc属性名を nameで設定した名称(path)に書き換える
          limit: 2048,
          name: './images/[name].[ext]',
        },
      }, // 画像ファイル関連
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  // webpack-dev-server 実行時の設定 (ファイルの起動時や変更時の監視を行う)
  devServer: {
    // npx webpack-dev-server --open 実行時 絶対パス(outputPath)で dist配下のindex.htmlを起動するよう設定
    contentBase: outputPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html', // 出力ファイル名を設定
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ],
  // 最適化に関する設定
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true, // console関連を本番環境で無視するよう設定
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  // devtoolでトランスパイル前のソースコードが確認できる(かなり便利な気がする)
  devtool: 'eval-source-map',
};
