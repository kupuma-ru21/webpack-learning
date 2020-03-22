const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

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
      // jsファイルを対象
      {
        test: /\.jsx?$/,
        // node_modulesはトランスパイルの対象に含めない
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // cssファイルを対象
      {
        test: /\.css$/,
        /*
        'css-loader', 'style-loader'を使用
        use配列内のloaderは逆順に実行される(重要))
        */
        use: ['style-loader', 'css-loader'],
      },
      // sassを対象
      {
        test: /\.scss$/, // .scssファイルを対象
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
  //webpack-dev-server 実行時の設定 (ファイルの起動時や変更時の監視を行う)
  devServer: {
    // npx webpack-dev-server --open 実行時 絶対パス(outputPath)で dist配下のindex.htmlを起動するよう設定
    contentBase: outputPath,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html', // 出力ファイル名を設定
    }),
  ],
};
