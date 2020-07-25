const { resolve, join } = require('path');

const B = 1;
const KB = 1000 * B;

const rootPath = __dirname;

module.exports = {
  entry: [join(rootPath, 'app', 'index.js')],
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            configFile: resolve('babel.config.js'),
          },
        }],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20 * KB,
              mimetype: 'application/font-woff'
            }
          }
        ],
        include: [
          resolve('dist/fonts')
        ]
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20 * KB,
              mimetype: 'application/font-woff'
            }
          }
        ],
        include: [
          resolve('dist/fonts')
        ]
      },
      {
        test: /\.(?:ico|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 300 * KB
            }
          }
        ],
        include: [
          resolve('dist/icons'),
          resolve('dist/images')
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 100 * KB
            }
          }
        ],
        include: [
          resolve('dist/icons'),
          resolve('dist/images')
        ]

      },
      {
        test: /\.html/,
        use: 'html-loader?attrs[]=video:src'
      }
    ]
  },
  optimization: {
   usedExports: true,
   sideEffects: false
 },
  target: 'web'
};
