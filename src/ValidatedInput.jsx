/**
 * @file 增强的ValidatedInput组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './ValidateInput.less';

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';
import {ValidatedInput} from 'react-bootstrap-validation';

import autosize from './util/autosize';

export default class ValidatedInputEx extends ValidatedInput {
    static get propTypes() {
        return {
            ...ValidatedInput.propTypes,

            // 当有字符串长度限制时，是否展示当前已输入的字数
            showLengthTip: React.PropTypes.bool
        };
    }

    static get defaultProps() {
        return {
            ...ValidatedInput.defaultProps,
            showLengthTip: true
        };
    }

    constructor(props, context) {
        super(props, context);

        const {type, showLengthTip, validate} = props;
        if (type === 'textarea' && showLengthTip && u.isString(validate)) {
            let matches = /isLength:(\d+):(\d+)/.exec(validate);
            if (matches && matches.length > 2) {
                this.maxLength = parseInt(matches[2], 10);
                this.currentLength = props.defaultValue ? props.defaultValue.length : 0;
            }
        }

        this.inputHandler = this.inputHandler.bind(this);
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();

        let inputNode = this.getInputDOMNode();
        this.maxLength && inputNode.addEventListener('input', this.inputHandler);
        this.props.type === 'textarea' && autosize(inputNode);
    }

    inputHandler() {
        this.maxLength && this.forceUpdate();
    }

    renderLabel(children) {
        let classes = {
            'control-label': !this.isCheckboxOrRadio()
        };

        let labelClassName = this.props.labelClassName;
        let validate = this.props.validate;
        classes[labelClassName] = labelClassName;

        if (!/\brequired\b/.test(labelClassName)
            && (u.isString(validate) && /\brequired\b/.test(validate) || /\brequired\b/.test(this.props.className))) {
            classes.required = 'required';
        }

        let classNames = classnames(classes);
        let required = /\brequired\b/.test(classNames);

        return this.props.label ? React.createElement(
            'label',
            {
                htmlFor: this.props.id,
                className: classNames,
                key: 'label'
            },
            children,
            React.createElement(
                'span',
                {
                    dangerouslySetInnerHTML: {__html: `${required ? '<i>*</i>' : ''}${this.props.label}`}
                }
            )
        ) : children;
    }

    renderFormGroup(children) {
        if (this.maxLength) {
            let currentLength = this.getInputDOMNode() ? this.getValue().length : this.currentLength;
            let className = currentLength > this.maxLength ? 'length-tip overstep' : 'length-tip';

            children.push(
                <span key="lengthTip" className={className}>
                    {currentLength}/{this.maxLength}
                </span>
            );
        }

        return super.renderFormGroup(children);
    }

    componentWillUnmount() {
        let inputNode = this.getInputDOMNode();
        if (inputNode) {
            inputNode.removeEventListener('input', this.inputHandler);

            if (this.props.type === 'textarea') {
                // remove autosize from textarea
                var evt = document.createEvent('Event');
                evt.initEvent('autosize:destroy', true, false);
                inputNode.dispatchEvent(evt);
            }
        }

        super.componentWillUnmount && super.componentWillUnmount();
    }
}
