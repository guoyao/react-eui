/**
* @file src/Control.jsx
* @author guoyao(wuguoyao@baidu.com)
**/

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';

const defaultProps = {
    className: 'eui-control'
};

export default class Control extends React.Component {
    render() {
        const className = classnames(defaultProps.className, this.props.className);
        const props = u.extend({}, defaultProps, u.omit(this.props, 'children'), {className});

        return <div {...props}>{this.props.children}</div>;
    }
}
