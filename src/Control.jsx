/**
* @file 非input组件基类
* @author guoyao(wuguoyao@baidu.com)
**/

import './Control.less';

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';

export default class Control extends React.Component {
    get controlClassName() {
        return classnames('eui-control', this.props.className);
    }

    renderControl() {
        return this.props.children;
    }

    render() {
        const props = u.extend({}, u.omit(this.props, 'children', 'data'), {className: this.controlClassName});

        return <div {...props}>{this.renderControl()}</div>;
    }
}
