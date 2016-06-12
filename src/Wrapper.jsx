/**
 * @file 组件包裹器
 * @author guoyao(wuguoyao@baidu.com)
 **/

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';

import Control from './Control';

const defaultProps = {
    className: 'eui-wrapper'
};

export default class Wrapper extends Control {
    static createWrapper(props, ...children) {
        const className = classnames(defaultProps.className, props.className);
        props = u.extend({}, defaultProps, props, {className});
        return React.createElement('div', props, children);
    }

    render() {
        const className = classnames(defaultProps.className, this.props.className);

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}
