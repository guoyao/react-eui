/**
* @file 富文本编辑器组件
* @author guoyao(wuguoyao@baidu.com)
**/

import './css/RichTextEditor.less';

import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: 'inherit',
        fontSize: 16,
        padding: 2
    }
};

function getBlockStyle(block) {
    switch (block.getType()) {
    case 'blockquote': return 'rich-text-editor-blockquote';
    default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = `rich-text-editor-style-button ${this.props.className || ''}`;
        if (this.props.active) {
            className += ' rich-text-editor-active-button';
        }

        return (
            <span
                className={className}
                title={this.props.title}
                onMouseDown={this.onToggle}
            >
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {
        key: 'header-one',
        label: 'H1',
        style: 'header-one',
        className: 'block-header block-header-one',
        title: '标题一'
    },
    {
        key: 'header-two',
        label: 'H2',
        style: 'header-two',
        className: 'block-header block-header-two',
        title: '标题二'
    },
    {
        key: 'header-three',
        label: 'H3',
        style: 'header-three',
        className: 'block-header block-header-three',
        title: '标题三'
    },
    {
        key: 'header-four',
        label: 'H4',
        style: 'header-four',
        className: 'block-header block-header-four',
        title: '标题四'
    },
    {
        key: 'header-five',
        label: 'H5',
        style: 'header-five',
        className: 'block-header block-header-five',
        title: '标题五'
    },
    {
        key: 'block-blockquote',
        label: '',
        style: 'blockquote',
        className: 'block-blockquote fa fa-quote-right',
        title: '引用'
    },
    {
        key: 'block-unordered-list-item',
        label: '',
        style: 'unordered-list-item',
        className: 'block-unordered-list-item fa fa-list-ul',
        title: '无序列表'
    },
    {
        key: 'block-ordered-list-item',
        label: '',
        style: 'ordered-list-item',
        className: 'block-ordered-list-item fa fa-list-ol',
        title: '有序列表'
    }
    /*
    {
        key: 'block-code-block',
        label: '',
        style: 'code-block',
        className: 'block-code-block fa fa-code',
        title: '代码块'
    }
    */
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="rich-text-editor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.key}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    className={type.className}
                    title={type.title}
                />
        )}
        </div>
    );
};

let INLINE_STYLES = [
    {
        key: 'inline-bold',
        label: '',
        style: 'BOLD',
        className: 'inline-bold fa fa-bold',
        title: '粗体'
    },
    {
        key: 'inline-italic',
        label: '',
        style: 'ITALIC',
        className: 'inline-italic fa fa-italic',
        title: '斜体'
    },
    {
        key: 'inline-underline',
        label: '',
        style: 'UNDERLINE',
        className: 'inline-underline fa fa-underline',
        title: '下划线'
    },
    {
        key: 'inline-strikethrough',
        label: '',
        style: 'STRIKETHROUGH',
        className: 'inline-strikethrough fa fa-strikethrough',
        title: '删除线'
    }
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="rich-text-editor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.key}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    className={type.className}
                    title={type.title}
                />
            )}
        </div>
    );
};

export default class RichTextEditor extends React.Component {
    static propTypes = {
        ...React.Component.propTypes,
        placeholder: React.PropTypes.string,
        content: React.PropTypes.string,
        maxLength: React.PropTypes.number
    }

    static defaultProps = {
        ...React.Component.defaultProps,
        placeholder: '',
        content: '',
        maxLength: Number.MAX_VALUE
    }

    constructor(props) {
        super(props);

        let contentState = stateFromHTML(props.content);
        this.state = {
            editorState: EditorState.createWithContent(contentState),
            valid: true
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    getHtml() {
        return stateToHTML(this.state.editorState.getCurrentContent());
    }

    getText() {
        return this.state.editorState.getCurrentContent().getPlainText();
    }

    validate() {
        const {maxLength} = this.props;
        if (maxLength !== Number.MAX_VALUE) {
            let currentLength = this.getText().length;
            let valid = currentLength <= maxLength;
            this.setState({valid});
            return valid;
        }

        return true;
    }

    renderHelpBlock() {
        const {maxLength} = this.props;
        if (maxLength !== Number.MAX_VALUE) {
            let currentLength = this.getText().length;
            if (currentLength > maxLength) {
                return (
                    <span className="help-block">
                        长度限制为{maxLength}个字
                    </span>
                );
            }
        }

        return null;
    }

    renderMaxLengthTip() {
        const {maxLength} = this.props;
        if (maxLength !== Number.MAX_VALUE) {
            let currentLength = this.getText().length;
            let className = currentLength > maxLength ? 'length-tip overstep' : 'length-tip';
            return (
                <span className={className}>
                    {currentLength}/{maxLength}
                </span>
            );
        }

        return null;
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'rich-text-editor-editor';
        const contentState = editorState.getCurrentContent();

        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' rich-text-editor-hide-placeholder';
            }
        }

        return (
            <div className={`rich-text-editor ${this.state.valid ? '' : 'has-error'}`}>
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />

                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />

                <div className={className} onClick={this.focus}>
                    <Editor
                        ref="editor"
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder={this.props.placeholder}
                        spellCheck
                    />
                </div>
                {this.renderHelpBlock()}
                {this.renderMaxLengthTip()}
            </div>
        );
    }
}
