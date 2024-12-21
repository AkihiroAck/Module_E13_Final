const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Подключаем плагин

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      // publicPath: '/',
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      hot: isDev, // Включить HMR только в режиме разработки
      // historyApiFallback: true, // Чтобы SPA не ломалась при обновлении страницы
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html', // Указываем путь к вашему HTML файлу
          filename: 'index.html', // Имя итогового файла HTML
        }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    watch: isDev,
  };
};
