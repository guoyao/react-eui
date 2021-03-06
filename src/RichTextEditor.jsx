/**
* @file 富文本框组件
* @author guoyao(wuguoyao@baidu.com)
**/

import React from 'react';

import InputControl from './InputControl';

export default class RichTextEditor extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        maximumWords: React.PropTypes.number,
        config: React.PropTypes.object
    }

    static defaultProps = {
        ...InputControl.defaultProps,
        placeholder: '',
        value: '',
        config: {
            initialFrameHeight: 250,
            autoHeightEnabled: false,
            elementPathEnabled: false,
            enableAutoSave: false,
            maximumWords: 2000,
            zIndex: 3000,
            serverUrl: '',
            imageUrlPrefix: '',
            initialStyle: [
                'p,ol{line-height:1.5em; color:#494949; '
                + 'font-family: Microsoft Yahei, Tahoma, Arial, Helvetica, STHeiti;; font-size:13px;}'
            ],
            toolbars: [
                [
                    'source', 'undo', 'redo', 'insertunorderedlist', 'insertorderedlist', 'unlink',
                    'link', 'bold', 'underline', 'fontborder', 'strikethrough', 'forecolor',
                    'backcolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
                    'removeformat', 'fontfamily', 'fontsize', '|', 'blockquote', 'cleardoc', 'formatmatch',
                    'indent', 'lineheight', 'paragraph', 'rowspacing', 'date', ''
                ]
            ]
        }
    }

    constructor(...args) {
        super(...args);

        this.editorId = `rich-text-editor-${new Date().getTime()}`;

        if (typeof this.props.maximumWords === 'number') {
            this.props.config.maximumWords = this.props.maximumWords;
        }
    }

    getValue() {
        return this.editor.getContent();
    }

    validate() {
        const {maximumWords} = this.props.config;

        let currentWords = this.editor.getContentLength(true);
        let valid = currentWords <= maximumWords;

        this.setState({valid});

        return valid;
    }

    renderControl() {
        return <div id={this.editorId} className="rich-text-editor" title={this.props.placeholder} />;
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();

        /* eslint-disable no-undef */
        this.editor = UE.getEditor(this.editorId, this.props.config);
        /* eslint-enable */

        this.editor.ready(() => {
            this.editor.setContent(this.props.value || '');
        });
    }

    componentWillUnmount() {
        this.editor.destroy();
        super.componentWillUnmount && super.componentWillUnmount();
    }
}
