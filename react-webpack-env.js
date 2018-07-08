/*eslint no-console:0 */

'use strict';

// Взять аргументы командной строки, начиная с третьего
//
// Вообще, аргументы в этом массиве, они примерно вот такие:
//    argv[0] === 'node'
//    argv[1] === 'server.js'
//    argv[2] === '--env=dev'
let scriptArguments = process.argv.slice(2);

// Импортируем minimist
let minimist = require('minimist');

// Пропускаем аргументы через minimist
const minimistArgs = minimist(scriptArguments);

process.env.APP_ENV = minimistArgs.env;
