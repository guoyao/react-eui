/**
 * @file 所有组件基类
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';
import classnames from 'classnames';

export default class Control extends React.Component {
    static propTypes = {
        ...React.Component.propTypes,
        label: React.PropTypes.string,
        actAsFormControl: React.PropTypes.bool
    }

    static defaultProps = {
        ...React.Component.defaultProps,
        label: '',
        actAsFormControl: false
    }

    renderLabel() {
        return (
            <label className="control-label">
                {this.props.label}
            </label>
        );
    }

    renderControl() {
        let className = classnames('eui-ctrl', this.props.className);

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }

    render() {
        let children = this.renderControl();

        if (this.props.label) {
            let className = {
                'form-group': this.props.actAsFormControl
            };

            className = classnames('eui-ctrl-wrapper', className);
            children = (
                <div className={className}>
                    {this.renderLabel()}
                    {children}
                </div>
            );
        }

        return children;
    }
}
