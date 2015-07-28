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
        module.exports = local;
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
        // init custom api
        local.swmg.apiUpdate({
            definitions: {
                // init TestCrudModel schema
                TestCrudModel: {
                    // drop collection on init
                    _collectionDrop: true,
                    _collectionName: 'SwmgTestCrud',
                    // init default crud-api
                    _crudApi: '_test',
                    _crudApiList: [
                        'crudAggregateMany',
                        'crudCountByQueryOne',
                        'crudCreateMany',
                        'crudCreateOne',
                        'crudDeleteByQueryMany',
                        'crudDeleteByIdOne',
                        'crudExistsByIdOne',
                        'crudGetByIdOne',
                        'crudGetByQueryMany',
                        'crudGetDistinctValueByPropertyMany',
                        'crudReplaceMany',
                        'crudReplaceOne',
                        'crudUpdateOne'
                    ],
                    properties: {
                        propArray: { items: {}, type: 'array' },
                        propArraySubdoc: {
                            default: [{ propRequired: true }],
                            items: { $ref: '#/definitions/TestCrudModel' },
                            type: 'array'
                        },
                        propBoolean: { type: 'boolean' },
                        propInteger: { type: 'integer' },
                        propIntegerInt32: { format: 'int32', type: 'integer' },
                        propIntegerInt64: { format: 'int64', type: 'integer' },
                        propNumber: { type: 'number' },
                        propNumberDouble: { format: 'double', type: 'number' },
                        propNumberFloat: { format: 'float', type: 'number' },
                        propObject: { type: 'object' },
                        propObjectSubdoc: { $ref: '#/definitions/TestNullModel' },
                        propRequired: { default: true },
                        propString: { type: 'string' },
                        propStringByte: { format: 'byte', type: 'string' },
                        propStringDate: { format: 'date', type: 'string' },
                        propStringDatetime: { format: 'date-time', type: 'string' },
                        propStringEmail:
                            { default: 'a@a.com', format: 'email', type: 'string' },
                        propStringJson:
                            { default: 'null', format: 'json', type: 'string' },
                        propUndefined: {}
                    },
                    required: ['propRequired'],
                    'x-inheritList': [{ $ref: '#/definitions/JsonapiResource' }]
                },
                // init TestNullModel schema
                TestNullModel: {}
            },
            paths: {
                // test custom api handling-behavior
                '/_test/echo': { post: {
                    _collectionName: 'SwmgTestCrud',
                    operationId: 'echo',
                    parameters: [{
                        // test array-csv-param handling-behavior
                        collectionFormat: 'csv',
                        description: 'csv-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayCsv',
                        type: 'array'
                    }, {
                        // test array-pipes-param handling-behavior
                        collectionFormat: 'pipes',
                        description: 'pipes-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayPipes',
                        type: 'array'
                    }, {
                        // test array-ssv-param handling-behavior
                        collectionFormat: 'ssv',
                        description: 'ssv-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArraySsv',
                        type: 'array'
                    }, {
                        // test array-tsv-param handling-behavior
                        collectionFormat: 'tsv',
                        description: 'tsv-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayTsv',
                        type: 'array'
                    }, {
                        description: 'body',
                        // test body-param handling-behavior
                        in: 'body',
                        name: 'paramBody',
                        schema: { $ref: '#/definitions/Undefined' }
                    }, {
                        description: 'header param',
                        // test header-param handling-behavior
                        in: 'header',
                        name: 'paramHeader',
                        type: 'string'
                    }, {
                        description: 'optional param',
                        in: 'query',
                        // test optional-param handling-behavior
                        name: 'paramOptional',
                        type: 'string'
                    }],
                    summary: 'echo request params back to client',
                    tags: ['_test']
                } },
                // test midddleware-error handling-behavior
                '/_test/errorMiddleware': { get: {
                    operationId: 'errorMiddleware',
                    tags: ['_test']
                } },
                // test undefined api handling-behavior
                '/_test/errorUndefinedApi': { get: {
                    operationId: 'errorUndefinedApi',
                    tags: ['_test']
                } },
                // test undefined crud-api handling-behavior
                '/_test/errorUndefinedCrud': { get: {
                    _collectionName: 'SwmgTestCrud',
                    _crudApi: true,
                    operationId: 'errorUndefinedCrud',
                    tags: ['_test']
                } }
            },
            _tagDict: { _test: { description: 'internal test-api' } }
        });
        // init test-middleware
        local.middleware.middlewareList.push(function (request, response, nextMiddleware) {
            switch (request.swmgPathname) {
            case 'POST /_test/echo':
                response.end(JSON.stringify(request.swmgParamDict));
                break;
            case 'GET /_test/errorMiddleware':
                nextMiddleware(new Error('dummy error'));
                break;
            default:
                nextMiddleware();
            }
        });
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
