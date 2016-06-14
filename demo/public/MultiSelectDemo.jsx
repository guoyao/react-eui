/**
 * @file demo for MultiSelect component
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';
import {MultiSelect} from '../../index';

const datasource = ['北京', '深圳', '青岛', '杭州', '香港', '美国硅谷', '上海', '亚太（新加坡）'];

export default class MultiSelectDemo extends React.Component {
    render() {
        return (
            <MultiSelect
                label="地区"
                groupClassName="horizontal"
                datasource={datasource}
            />
        );
    }
}
