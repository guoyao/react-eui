'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_underscore2.default.mixin({
  /**
   * 去除字符串首尾空格
   *
   * @param {string} s 输入字符串
   * @return {string}
   */

  trim: function trim(s) {
    return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
}); /**
     * @file Validator扩展
     * @author guoyao(wuguoyao@baidu.com)
     **/

var util = {};

util.emptyFunc = function () {};

exports.default = util;