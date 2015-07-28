/*jslint
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
        local.optionsId = function (options) {
            /*
             * this function will init petstore id's
             */
            return local.utility2.objectSetDefault(options, {
                name: options.id,
                orderId: options.id,
                petId: options.id,
                photoUrls: [options.id],
                status: options.id,
                tags: [{ id: options.id, name: options.id }],
                username: options.id
            });
        };

        // init tests
        local.testCase_ajax_404 = function (options, onError) {
            /*
             * this function will test ajax's "404 not found" handling-behavior
             */
            // jslint-hack
            local.utility2.nop(options);
            // test '/_test/undefined'
            local.utility2.ajax({ url: '/_test/undefined' }, function (error) {
                local.utility2.testTryCatch(function () {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    // validate 404 http statusCode
                    local.utility2.assert(error.statusCode === 404, error.statusCode);
                    onError();
                }, onError);
            });
        };
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        // init tests
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // init swaggerUi
        local.utility2.onReady.counter += 1;
        window.swaggerUi = new window.SwaggerUi({
            dom_id: "swagger-ui-container",
            onComplete: function () {
                local.swmg.swaggerJson = local.swmg.api.swaggerJson;
                local.utility2.onReady();
            },
            supportedSubmitMethods: ['delete', 'get', 'patch', 'post', 'put'],
            url: '/api/v0/swagger.json'
        });
        // init api
        window.swaggerUi.load();
        local.swmg.api = window.swaggerUi.api;
        // run test
        local.utility2.testRun(local);
        break;



    // run node js-env code
    case 'node':
        // test null apiUpdate handling-behavior
        local.swmg.apiUpdate({});
        // init test api
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
        // jslint dir
        [
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                // if the file is modified, then restart the process
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                case '.js':
                case '.json':
                    // jslint file
                    local.utility2.jslint_lite
                        .jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
            });
        });
        // init repl debugger
        local.utility2.replStart();
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
        local = local.modeJs === 'browser'
            ? window.local
            : require('./index.js');
    }());
    return local;
}())));
