/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function (local) {
    'use strict';



    // run shared js-env code
    (function () {
        return;
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        break;



    // run node js-env code
    case 'node':
        // export app
        module.exports = local.app;
        module.exports.__dirname = __dirname;
        // require modules
        local.fs = require('fs');
        local.path = require('path');
        local.url = require('url');
        // init assets
        local.utility2.cacheDict.assets['/assets/app.js'] =
            local.utility2.istanbul_lite.instrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'app.js'
            );
        local.utility2.cacheDict.assets['/test/test.js'] =
            local.utility2.istanbul_lite.instrumentInPackage(
                local.fs.readFileSync('test.js', 'utf8'),
                __filename,
                'test.js'
            );
        break;
    }
}((function () {
    'use strict';
    var local;



    // run shared js-env code
    (function () {
        // init local
        local = {};
        local.modeJs = (function () {
            try {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            } catch (errorCaughtNode) {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    'browser';
            }
        }());
        // init example.js
        if (local.modeJs === 'node') {
            require('fs').writeFileSync(
                './example.js',
                require('fs').readFileSync('./README.md', 'utf8')
                    // support syntax-highlighting
                    .replace((/[\S\s]+?\n.*?example.js\s*?```\w*?\n/), function (match0) {
                        // preserve lineno
                        return match0.replace((/.+/g), '');
                    })
                    .replace((/\n```[\S\s]+/), '')
            );
            // init example.js
            local = require('./example.js');
        }
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init swmg
        local.swmg = local.modeJs === 'browser'
            ? window.swmg
            : require('swagger-mongodb');
        // init utility2
        local.utility2 = local.swmg.local.utility2;
        // init app
        local.app = { local: local };
        // export local
        local.global.local = local;
    }());
    return local;
}())));
