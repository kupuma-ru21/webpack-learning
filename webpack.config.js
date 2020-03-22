const path = require('path');

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
  //webpack-dev-server 実行時の設定 (ファイルの起動時や変更時の監視を行う)
  devServer: {
    // npx webpack-dev-server --open 実行時 絶対パス(outputPath)で dist配下のindex.htmlを起動するよう設定
    contentBase: outputPath,
  },
};
