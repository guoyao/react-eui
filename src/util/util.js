/**
 * @file Validator扩展
 * @author guoyao(wuguoyao@baidu.com)
 **/

import u from 'underscore';

u.mixin({
    /**
     * 去除字符串首尾空格
     *
     * @param {string} s 输入字符串
     * @return {string}
     */
    trim(s) {
        return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
});

let util = {};

util.emptyFunc = function () {};

util.defaultFunc = function (v) {
    return v;
};

export default util;
