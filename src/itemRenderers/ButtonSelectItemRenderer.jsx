import React from 'react';
import {override} from 'core-decorators';

import ItemRenderer from './ItemRenderer';

export default class ButtonSelectItemRenderer extends ItemRenderer {
    @override
    renderControl() {
        return (
            <label className="btn btn-primary active">
                <input type="checkbox" autocomplete="off" checked /> Checkbox 1 (pre-checked)
            </label>
        );
    }
}