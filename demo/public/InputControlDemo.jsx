/**
 * @file demo for InputControl
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';

import {InputControl} from '../../src/index';

export default class InputControlDemo extends React.Component {
    changeHandler = e => {
        console.log(e.target.value);
    }

    render() {
        return (
            <div>
                <section>
                    <InputControl>纯文本1</InputControl>
                    <InputControl label="带label的纯文本" wrapperClassName="eui-wrapper">纯文本1</InputControl>
                    <InputControl className="text-primary">纯文本2</InputControl>

                    <InputControl type="text" />
                    <InputControl type="text" label="概要内容" />
                    <InputControl
                        type="text"
                        label="概要内容"
                        validate="required"
                        onChange={this.changeHandler}
                        errorHelp={{
                            required: '请填写'
                        }}
                    />

                    <InputControl type="textarea" />
                    <InputControl
                        type="textarea"
                        label="详细信息"
                        validate="required,isLength:0:30"
                        onChange={this.changeHandler}
                        errorHelp={{
                            required: '请填写',
                            isLength: '字符长度限制为0-30'
                        }}
                    />
                </section>
                <section>
                    <InputControl
                        type="text"
                        label="概要内容"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                    />
                    <InputControl
                        type="text"
                        label="概要内容"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        validate="required"
                        onChange={this.changeHandler}
                        errorHelp={{
                            required: '请填写'
                        }}
                    />

                    <InputControl
                        type="textarea"
                        label="详细信息"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        validate="required,isLength:0:30"
                        onChange={this.changeHandler}
                        errorHelp={{
                            required: '请填写',
                            isLength: '字符长度限制为0-30'
                        }}
                    />
                </section>
            </div>
        );
    }
}
