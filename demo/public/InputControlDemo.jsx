/**
 * @file demo for InputControl
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';

import {InputControl, Form} from '../../index';

export default class InputControlDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(value) {
        console.log(value);
    }

    render() {
        return (
            <div className="row select-demo">
                <div className="col-md-6">
                    <InputControl>纯文本1</InputControl>
                    <InputControl label="带label的纯文本">纯文本1</InputControl>
                    <InputControl className="text-primary">纯文本2</InputControl>

                    <InputControl type="text" />
                    <InputControl type="text" label="概要内容" />

                    <InputControl type="textarea" />
                    <InputControl
                        type="textarea"
                        label="详细信息"
                        validate='isLength:0:30'
                    />
                </div>
                <div className="col-md-6">
                    <Form>
                        <InputControl name="pureText0">纯文本1</InputControl>
                        <InputControl label="带label的纯文本" name="pureText1">纯文本1</InputControl>
                        <InputControl className="text-primary" name="pureText2">纯文本2</InputControl>

                        <InputControl type="text" name="abstract1" />
                        <InputControl type="text" name="abstract2" label="概要内容" />

                        <InputControl type="textarea" name="detail1" />
                        <InputControl
                            type="textarea"
                            name="detai2"
                            label="详细信息"
                            validate='isLength:0:30'
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
