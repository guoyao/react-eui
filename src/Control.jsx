/**
* @file 非input组件基类
* @author guoyao(wuguoyao@baidu.com)
**/

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';

export default class Control extends React.Component {
    get controlClassName() {
        return classnames('eui-control', this.props.className);
    }

    renderControl() {
        const props = u.extend({}, u.omit(this.props, 'children'), {className: this.controlClassName});

        return <div {...props}>{this.props.children}</div>;
    }

    render() {
        return this.renderControl();
    }
}
