/**
 * @file Validator扩展
 * @author guoyao(wuguoyao@baidu.com)
 **/

import u from 'underscore';
import moment from 'moment';
import {Validator} from 'react-bootstrap-validation';

let isEmail = Validator.isEmail;

Validator.extend('isEmail', function (value, options) {
    if (options === 'allowMulti') {
        let emails = value.split(/,|，/);
        let result = true;

        u.each(emails, function (value) {
            value = value.trim();
            if (value !== '' && !isEmail(value)) {
                result = false;
            }
        });
        return result;
    }
    return isEmail(value);
});

Validator.extend('isNumericBetween', function (value, options) {
    if (typeof value === 'string') {
        value = u.trim(value);
        if (value.length === 0 || !((value = Number(value)) || value === 0)) {
            return options && options.errorHelp && options.errorHelp.isNumericBetween || false;
        }
    }

    if (!u.isNumber(value)) {
        return options && options.errorHelp && options.errorHelp.isNumericBetween || false;
    }

    var min;
    var max;
    if (u.isObject(options)) {
        min = options.min;
        max = options.max;
    }
    else if (arguments.length >= 3) {
        min = Number(arguments[1]);
        max = Number(arguments[2]);
    }

    !u.isNumber(min) && (min = Number.NEGATIVE_INFINITY);
    !u.isNumber(max) && (max = Number.POSITIVE_INFINITY);

    if (value < min || value > max) {
        return options && options.errorHelp && options.errorHelp.isNumericBetween || false;
    }

    return true;
});

Validator.extend('allRequired', function (value, options) {
    var requiredLength;

    if (typeof value === 'string') {
        value = u.trim(value);
    }

    if (value.length === 0) {
        return options && options.errorHelp && options.errorHelp.allRequired || '请填写';
    }

    if (u.isObject(options)) {
        requiredLength = options.requiredLength;
    }
    else if (arguments.length >= 2) {
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
Validator.extend('isTimeRange', function (value, options) {
    let [startTime, endTime] = value.split(/\s*,\s*/);
    return moment(endTime).isAfter(startTime);
});
/* eslint-enable no-unused-vars */

u.each(Validator, function (v, key) {
    if (u.isFunction(v)) {
        Validator[key] = function () {
            let args = u.toArray(arguments);
            let index = u.findIndex(args, item => item === 'allowEmpty' || (item && item.allowEmpty));

            if (index > -1) {
                args.splice(index, 1);
                if (!args[0]) {
                    return true;
                }
            }

            return v.apply(Validator, args);
        };
    }
});

export default Validator;
