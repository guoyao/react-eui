'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactBootstrapValidation = require('react-bootstrap-validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmail = _reactBootstrapValidation.Validator.isEmail; /**
                                                            * @file Validator扩展
                                                            * @author guoyao(wuguoyao@baidu.com)
                                                            **/

_reactBootstrapValidation.Validator.extend('isEmail', function (value, options) {
    if (options === 'allowMulti') {
        var emails = value.split(/,|，/);
        var result = true;

        _underscore2.default.each(emails, function (value) {
            value = value.trim();
            if (value !== '' && !isEmail(value)) {
                result = false;
            }
        });
        return result;
    }
    return isEmail(value);
});

_reactBootstrapValidation.Validator.extend('isNumericBetween', function (value, options) {
    if (typeof value === 'string') {
        value = _underscore2.default.trim(value);
        if (value.length === 0 || !((value = Number(value)) || value === 0)) {
            return options && options.errorHelp && options.errorHelp.isNumericBetween || false;
        }
    }

    if (!_underscore2.default.isNumber(value)) {
        return options && options.errorHelp && options.errorHelp.isNumericBetween || false;
    }

    var min;
    var max;
    if (_underscore2.default.isObject(options)) {
        min = options.min;
        max = options.max;
    } else if (arguments.length >= 3) {
        min = Number(arguments[1]);
        max = Number(arguments[2]);
    }

    !_underscore2.default.isNumber(min) && (min = Number.NEGATIVE_INFINITY);
    !_underscore2.default.isNumber(max) && (max = Number.POSITIVE_INFINITY);

    if (value < min || value > max) {
        return options && options.errorHelp && options.errorHelp.isNumericBetween || false;
    }

    return true;
});

_reactBootstrapValidation.Validator.extend('allRequired', function (value, options) {
    var requiredLength;

    if (typeof value === 'string') {
        value = _underscore2.default.trim(value);
    }

    if (value.length === 0) {
        return options && options.errorHelp && options.errorHelp.allRequired || '请填写';
    }

    if (_underscore2.default.isObject(options)) {
        requiredLength = options.requiredLength;
    } else if (arguments.length >= 2) {
        requiredLength = Number(arguments[1]);
    }

    if (requiredLength) {
        var values = (value + '').split(',');
        if (values.length < requiredLength) {
            return options && options.errorHelp && options.errorHelp.allRequired || '请填写';
        }
    }

    return true;
});

/* eslint-disable no-unused-vars */
_reactBootstrapValidation.Validator.extend('isTimeRange', function (value, options) {
    var _value$split = value.split(/\s*,\s*/),
        _value$split2 = (0, _slicedToArray3.default)(_value$split, 2),
        startTime = _value$split2[0],
        endTime = _value$split2[1];

    return (0, _moment2.default)(endTime).isAfter(startTime);
});
/* eslint-enable no-unused-vars */

_underscore2.default.each(_reactBootstrapValidation.Validator, function (v, key) {
    if (_underscore2.default.isFunction(v)) {
        _reactBootstrapValidation.Validator[key] = function () {
            var args = _underscore2.default.toArray(arguments);
            var index = _underscore2.default.findIndex(args, function (item) {
                return item === 'allowEmpty' || item && item.allowEmpty;
            });

            if (index > -1) {
                args.splice(index, 1);
                if (!args[0]) {
                    return true;
                }
            }

            return v.apply(_reactBootstrapValidation.Validator, args);
        };
    }
});

exports.default = _reactBootstrapValidation.Validator;