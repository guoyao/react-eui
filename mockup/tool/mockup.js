/**
 * @file 处理mockup相关功能
 */
var qs = require('querystring');

var logger = require('./logger');
var session = require('./session');

var mockup = {};

var kWhiteLists = [];

var kWhiteListKeys = {};
kWhiteLists.forEach(function (item) {
    kWhiteListKeys[item] = true;
});

function injectXSSCode(root) {
    if (session.get('no_xss') === true) {
        return root;
    }

    if (Array.isArray(root)) {
        for (var i = 0; i < root.length; i ++) {
            root[i] = injectXSSCode(root[i]);
        }
    }
    else if (typeof root === 'object') {
        for (var key in root) {
            if (kWhiteListKeys[key]) {
                continue;
            }

            root[key] = injectXSSCode(root[key]);
        }
    }
    else if (typeof root === 'string') {
        return root + '<xmp>';
    }

    return root;
}

/**
 * 去除接口的查询字符串 `?112222`
 * require.cache 相关key已经被删除，不存在缓存问题
 *
 * @param {string} path 路径字符串
 * @return {string} 去除查询字符串后的路径
 */
function filterArgs(path) {
    var index = path.indexOf('?');
    index = index > -1 ? index : path.length;

    return path.substr(0, index);
}

/**
 * 获取mockup结果
 *
 * 对于请求path如果为/hello/world
 * 则对应的mockup数据文件位置为：mockup/hello/world.js
 *
 * @param {Object} request 请求对象
 * @return {?Object}
 */
mockup.load = function(request) {
    logger.ok('React', 'OK', 'Mockup load data for `' + request.url + '`');
    var path = request.url.replace(/^\/data/, '') || '';
    var pathSegments = path.split(/\//);
    var notEmptySegments = [];
    pathSegments.forEach(function (item) {
        item && notEmptySegments.push(item);
    });

    if (notEmptySegments.length > 1) {
        var filePath = notEmptySegments.join('/');

        try {
            var mockModuleName = filterArgs('../' + filePath);

            var referer = request.headers.referer;
            session.set('no_xss', /\bno_xss\b/.test(referer));
            var response = require(mockModuleName);
            if (typeof response === 'function') {
                response = response(request.path, request.params, request);
            }
            delete require.cache[require.resolve(mockModuleName)];
            return injectXSSCode(response);
        }
        catch (e) {
            logger.error('React', 'ERROR', 'Mockup data not found for `' + path + '`');
            return null;
        }
    }
    else {
        return null;
    }
};



/**
 * 返回普通成功mockup请求
 *
 * @param {Object} result 返回的结果数据
 */
mockup.ok = function (result) {
    return injectXSSCode({
        "success": true,
        "result": result || {}
    });
};

/**
 * 返回读取session成功mockup请求
 *
 * @param {Object} result 返回的结果数据
 */
mockup.session = function (result) {
    return {
        "success": true,
        "result": result || {
            "visitor": {
                "username": "访问者",
                "roleId": 1,
                "id": 123
            },
            "adOwner": {
                "username": "广告主",
                "roleId": 1,
                "id": 124
            }
        }
    };
};

/**
 * 返回列表类型成功mockup请求
 *
 * @param {Object} result 返回的结果数据
 * @param {Object} page 返回分页数据的元数据
 */
mockup.list = function (result, page) {
    page = page || {};

    return injectXSSCode({
        "success": true,
        "page": {
            "totalCount": page.totalCount || 100,
            "pageNo": page.pageNo || 1,
            "pageSize": page.pageSize || 15,
            "orderBy": page.orderBy || "id",
            "order": page.order || "desc",
            "result": result || []
        }
    });
};

/**
 * 返回普通失败mockup请求
 *
 * @param {Object} msg 失败信息
 */
mockup.fail = function (msg) {
    return injectXSSCode({
        success: false,
        message: msg || ''
    });
};

/**
 * 返回表单项验证失败mockup请求
 *
 * @param {Object} fields 表单项name和失败信息对应关系信息
 */
mockup.fieldFail = function (fields) {
    return mockup.fail({
        field: fields || {}
    });
};

/**
 * 返回全局失败mockup请求
 *
 * @param {Object} msg 全局失败响应提示信息
 */
mockup.globalFail = function (msg) {
    // return mockup.fail({
    //     global: msg && msg.toString() || ''
    // });
    return injectXSSCode({
        success: false,
        requestId: 'cf0e8c90-32a2-4c88-95bd-2bbfcdd57a24',
        code: "DemoExceptions.BasicException",
        message: {
            global: msg && msg.toString() || ''
        }
    });
};

/**
 * 返回iframe回调的mockup请求
 *
 * @param {string} script 回调代码
 */
mockup.iframeCallback = function (script) {
    return [
        '<!doctype html>',
        '<html>',
        '<meta charset="utf-8" />',
        '<script>',
        script,
        '</script>',
        '</html>'
    ].join();
};

module.exports = exports = mockup;




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
