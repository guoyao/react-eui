/**
 * @file 时间相关的方法
 * @author lvsiyuan(lvsiyuan@baidu.com)
 */
import moment from 'moment';

let timeUtil = {};

timeUtil.getToday = (date = new Date()) => {
    return moment(date).format('YYYY-MM-DD');
};

timeUtil.getMonthLastDay = (monthStr) => {
    let year = monthStr.substring(0, 4);
    let month = parseInt(monthStr.substring(5, 7), 10);
    let dt = new Date(year, month - 1, '01');
    let cdt;

    dt.setDate(1);
    dt.setMonth(dt.getMonth() + 1);
    cdt = new Date(dt.getTime() - 1000 * 60 * 60 * 24);

    return moment(cdt).format('YYYY-MM-DD');
};

timeUtil.getStartTime = (date = new Date()) => {
    return moment(date).format('YYYY-MM-DD 00:00:00');
};

timeUtil.getEndTime = (date = new Date()) => {
    return moment(date).format('YYYY-MM-DD 23:59:59');
};

timeUtil.getMonthFirstDay = (d) => {
    d = d || new Date();
    return moment(d).format('YYYY-MM-01');
};

timeUtil.timeToUtc = (timeStr) => {
    if (timeStr) {
        timeStr = (timeStr && timeStr._isAMomentObject) ? timeStr : moment(timeStr);
        return timeStr.utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    }
    return '';
};

timeUtil.toUtcTime = (utcTimeStr) => {
    return moment(utcTimeStr).utc().format('YYYY-MM-DD HH:mm:ss');
};

timeUtil.toTime = (utcTimeStr) => {
    return utcTimeStr ? moment(utcTimeStr).format('YYYY-MM-DD HH:mm:ss') : '';
};

timeUtil.utcToMinute = (utcTimeStr) => {
    if (utcTimeStr) {
        return moment(utcTimeStr).format('YYYY-MM-DD HH:mm');
    }
    return '';
};

timeUtil.utcToMonth = (utcTimeStr) => {
    if (utcTimeStr) {
        return moment(utcTimeStr).format('YYYY-MM');
    }
    return '';
};

timeUtil.toDate = (utcTimeStr) => {
    return moment(utcTimeStr).format('YYYY-MM-DD');
};

// 检查是否是UTC格式参数
timeUtil.checkUTC = (utcTime, isEndDate) => {
    var utcFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]Z$/;
    var dateFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
    if (utcFormat.test(utcTime)) {
        return utcTime;
    }
    else if (dateFormat.test(utcTime)) {
        return moment(utcTime + (isEndDate ? ' 23:59:59' : '')).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    }

    return null;
};

timeUtil.checkTime = (time, isEndDate) => {
    var timeFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}\s([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    var dateFormat = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
    if (timeFormat.test(time)) {
        return time;
    }
    else if (dateFormat.test(time)) {
        return moment(time + (isEndDate ? ' 23:59:59' : '')).format('YYYY-MM-DD HH:mm:ss');
    }

    return null;
};

/**
 * 字符串转Date格式
 * @param  {string=} timeStr 格式化字符串
 * @example `YYYY-MM-DD`
 * @return {Date} Date
 */
timeUtil.strToDate = (timeStr) => {
    return moment(timeStr).toDate();
};

/**
 * 获取基于当前日期后 n 天时间
 * @param  {number | string} n 相隔时间数
 * @param {Date=} d 传入时间
 * @param {string=} type 计算单位，默认为 `days`
 * @return {string} 格式化日期字符 `YYYY-MM-DD`
 */
timeUtil.getDateElse = (n, d, type) => {
    n = parseInt(n, 10);
    d = d || new Date();
    type = type || 'days';
    return moment(d).add(n, type).format('YYYY-MM-DD');
};

export default timeUtil;
