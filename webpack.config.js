const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = (env, options) => {
  return {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: [
      'intersection-observer',
      '@babel/polyfill',
      'nodelist-foreach-polyfill',
      `./src/ts/index.ts`
    ],

    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/dist/assets/js/`,
      // 出力ファイル名
      filename: 'bundle.js'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env'
                ]
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          resolve: {
            extensions: ['.ts']
          },
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        {
          test: /\.vert$/i,
          use: 'raw-loader'
        },
        {
          test: /\.frag$/i,
          use: 'raw-loader'
        },
        {
          test: /\.ejs$/,
          loader: 'ejs-loader',
          query: {
            variable: 'data',
            interpolate: '\\{\\{(.+?)\\}\\}',
            evaluate: '\\[\\[(.+?)\\]\\]'
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.scss/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                importLoaders: 2
              }
            },
            {
              loader: "sass-loader",
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/ts'),
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'inline-source-map';
  module.exports.mode = 'development';
}
