/*eslint no-console:0 */

'use strict';

// Это для работы с webpack через интерфейс node.js
const webpack = require('webpack');

const NameAllModulesPlugin = require('name-all-modules-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const {ifDev, ifDist, ifTest, ifNotTest, switchEnv} = require('./config-env-conditions');

const path = require('path');

const srcPath = path.join(__dirname, '/src');

const testPath = path.join(__dirname, '/test');

// Функция принимает объект чанка, и должна возвращать его идентификатор
const buildChunkIdFromChunk = (chunk) => {

  // Если у чанка есть имя...
  if(chunk.name) {

    // значит мы возвращаем его имя как идентификатор
    return chunk.name;
  }

  // Если мы здесь, то у чанка нету имени

  // Тогда мы смотрим внутрь чанка, и берем все модули этого чанка
  // Будем собирать идентификатор чанка из параметров модулей.
  return chunk

  // Сначала мы каждый из этих модулей преобразовываем
    .mapModules(
      // Каждый очередной модуль мы берем...
      m => {

        // m.context = /e/java/technologies/webpack/projects/long-term-caching/src
        // m.request = /e/java/technologies/webpack/projects/long-term-caching/src/async-baz.js
        // moduleRelativePath = async-baz.js

        let moduleRelativePath = path.relative(m.context, m.request);

        return moduleRelativePath;
      }
    )

    // Потом, все вот эти пути мы объединяем в одну строчку через
    // символ "_"
    .join('_');
};

module.exports = () => {

  let config = {

    devtool: switchEnv({
      // dev: 'eval-source-map',
      dev: 'source-map',
      dist: 'sourcemap',
      test: 'eval'
    }),

    resolve: {
      extensions: ['.js']
    },

    module: {

      rules: [

        ...ifTest([
          {
            enforce: 'pre',

            // Исходники js
            test: /\.js$/,

            // Которые лежат в каталоге исходников нашего проекта
            include: srcPath,

            loader: 'istanbul-instrumenter-loader',

            query: {
              esModules: true
            }
          }
        ]),

        ...ifNotTest([
          {
            enforce: 'pre',

            // Исходники js
            test: /\.js$/,

            // Которые лежат в каталоге исходников нашего проекта
            include: srcPath,

            loader: 'eslint-loader'
          }
        ]),

        ...ifTest([
          {
            test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
            loader: 'null-loader'
          }
        ]),

        ...ifNotTest([
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },

          {
            test: /\.scss$/,

            use: [

              // inject CSS to page
              'style-loader',

              // translates CSS into CommonJS modules
              'css-loader',

              // Run post css actions
              {
                loader: 'postcss-loader',

                options: {

                  // post css plugins, can be exported to postcss.config.js
                  plugins: function () {

                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              },

              // compiles Sass to CSS
              'sass-loader?outputStyle=expanded'
            ]
          },

          {
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
          },

          {
            test: /\.(mp4|ogg|svg)$/,
            loader: 'file-loader'
          }
        ]),

        {
          // Загружает файлы js
          test: /\.js$/,

          loader: 'babel-loader',

          // Загружать только файлы из таких каталогов
          include: [
            srcPath,

            ...ifTest([
              testPath
            ])
          ]
        }
      ]
    },

    cache: ifDev(),

    plugins: [

      new CleanWebpackPlugin([
        'dist'
      ]),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['runtime']
      }),
      new webpack.NamedChunksPlugin(buildChunkIdFromChunk),
      new webpack.NamedModulesPlugin(),
      new NameAllModulesPlugin(),

      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: 'dependency',
        inject: 'body'
      }),

      ...ifDev([
        new webpack.HotModuleReplacementPlugin()
      ]),

      ...ifNotTest([
        new webpack.NoEmitOnErrorsPlugin()
      ]),

      ...ifDist([
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),

        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: true
          },
          minimize: true
        }),

        new webpack.optimize.AggressiveMergingPlugin()
      ])
    ]
  };

  Object.assign(
    config,

    ifNotTest({

      // Это наверное как паковать статические ресурсы
      output: {
        path: path.join(__dirname, '/dist'),

        filename: switchEnv({
          dev: '[name].js',
          dist: '[name].[chunkhash].js'
        })
      },

      devServer: {
        contentBase: './dist/',
        historyApiFallback: true,
        hot: true,
        port: 8000,
        host: 'localhost',
        noInfo: false
      },

      entry: {

        main: [

          ...ifDev([
            'react-hot-loader/patch'
          ]),

          './src/index'
        ],

        vendor: [
          'normalize.css',
          'lodash',
          'react',
          'react-dom',
          'bootstrap',
          'jquery',
          'bootstrap/dist/css/bootstrap.css'
        ]
      }
    })
  );

  return config;
};
