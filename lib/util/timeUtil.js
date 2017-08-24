'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeUtil = {}; /**
                    * @file 时间相关的方法
                    * @author lvsiyuan(lvsiyuan@baidu.com)
                    */


timeUtil.getToday = function () {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    return (0, _moment2.default)(date).format('YYYY-MM-DD');
};

timeUtil.getMonthLastDay = function (monthStr) {
    var year = monthStr.substring(0, 4);
    var month = parseInt(monthStr.substring(5, 7), 10);
    var dt = new Date(year, month - 1, '01');
    var cdt = void 0;

    dt.setDate(1);
    dt.setMonth(dt.getMonth() + 1);
    cdt = new Date(dt.getTime() - 1000 * 60 * 60 * 24);

    return (0, _moment2.default)(cdt).format('YYYY-MM-DD');
};

timeUtil.getStartTime = function () {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    return (0, _moment2.default)(date).format('YYYY-MM-DD 00:00:00');
};

timeUtil.getEndTime = function () {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    return (0, _moment2.default)(date).format('YYYY-MM-DD 23:59:59');
};

timeUtil.getMonthFirstDay = function (d) {
    d = d || new Date();
    return (0, _moment2.default)(d).format('YYYY-MM-01');
};

timeUtil.timeToUtc = function (timeStr) {
    if (timeStr) {
        timeStr = timeStr && timeStr._isAMomentObject ? timeStr : (0, _moment2.default)(timeStr);
        return timeStr.utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    }
    return '';
};

timeUtil.toUtcTime = function (utcTimeStr) {
    return (0, _moment2.default)(utcTimeStr).utc().format('YYYY-MM-DD HH:mm:ss');
};

timeUtil.toTime = function (utcTimeStr) {
    return utcTimeStr ? (0, _moment2.default)(utcTimeStr).format('YYYY-MM-DD HH:mm:ss') : '';
};

timeUtil.utcToMinute = function (utcTimeStr) {
    if (utcTimeStr) {
        return (0, _moment2.default)(utcTimeStr).format('YYYY-MM-DD HH:mm');
    }
    return '';
};

timeUtil.utcToMonth = function (utcTimeStr) {
    if (utcTimeStr) {
        return (0, _moment2.default)(utcTimeStr).format('YYYY-MM');
    }
    return '';
};

timeUtil.toDate = function (utcTimeStr) {
    return (0, _moment2.default)(utcTimeStr).format('YYYY-MM-DD');
};

// 检查是否是UTC格式参数
timeUtil.checkUTC = function (utcTime, isEndDate) {
    var utcFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]Z$/;
    var dateFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
    if (utcFormat.test(utcTime)) {
        return utcTime;
    } else if (dateFormat.test(utcTime)) {
        return (0, _moment2.default)(utcTime + (isEndDate ? ' 23:59:59' : '')).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    }

    return null;
};

timeUtil.checkTime = function (time, isEndDate) {
    var timeFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}\s([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    var dateFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
    if (timeFormat.test(time)) {
        return time;
    } else if (dateFormat.test(time)) {
        return (0, _moment2.default)(time + (isEndDate ? ' 23:59:59' : '')).format('YYYY-MM-DD HH:mm:ss');
    }

    return null;
};

/**
 * 字符串转Date格式
 * @param  {string=} timeStr 格式化字符串
 * @example `YYYY-MM-DD`
 * @return {Date} Date
 */
timeUtil.strToDate = function (timeStr) {
    return (0, _moment2.default)(timeStr).toDate();
};

/**
 * 获取基于当前日期后 n 天时间
 * @param  {number | string} n 相隔时间数
 * @param {Date=} d 传入时间
 * @param {string=} type 计算单位，默认为 `days`
 * @return {string} 格式化日期字符 `YYYY-MM-DD`
 */
timeUtil.getDateElse = function (n, d, type) {
    n = parseInt(n, 10);
    d = d || new Date();
    type = type || 'days';
    return (0, _moment2.default)(d).add(n, type).format('YYYY-MM-DD');
};

exports.default = timeUtil;