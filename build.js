/*eslint no-console:0 */

'use strict';

require('core-js/fn/object/assign');

// Импортируем функцию webpack, которая есть в модуле webpack для node.js
// С webpack можно работать не только через CLI, но и через модуль для node.js
// webpack - это не только пакет npm, в котором есть утилита командной строки.
// Пакет также содержит и модуль для node.js, при помощи которого можно совершать
// компиляцию и запуск приложения из приложений node.js
const webpack = require('webpack');

const getWebpackConfig = require('./get-webpack-config');

// Библиотека для работы с аргументами командной строки
let minimist = require('minimist');

// Взять аргументы командной строки, начиная с третьего
//
// Вообще, аргументы в этом массиве, они примерно вот такие:
//    argv[0] === 'node'
//    argv[1] === 'server.js'
//    argv[2] === '--env=dev'
let scriptArguments = process.argv.slice(2);

// Пропускаем аргументы через minimist
const minimistArgs = minimist(scriptArguments);

process.env.APP_ENV = minimistArgs.env;

const config = getWebpackConfig();

// Запускаем сборку проекта вебпаком, с конфигурацией, которая у нас есть в проекте
// Получаем ссылку на скомпилированое приложение как объект
const compiler = webpack(config);

compiler.run(function(err, stats) {

  if(err) {
    console.log('Error: ' + err);
  }

  const jsonStats = stats.toJson();

  if(jsonStats.errors.length > 0) {
    jsonStats.errors.forEach(it => console.log('ERROR ' + it));
  }

  if(jsonStats.warnings.length > 0) {
    jsonStats.warnings.forEach(it => console.log('WARN ' + it));
  }
});

