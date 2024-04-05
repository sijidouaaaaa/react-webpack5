import { UPDATE_TEMPLATE_FIlES } from '../actions/common.js';

const INIT_STATE = {
    // 文件导入模板
    templateFiles: {}
};

export default function(state = INIT_STATE, action) {
    switch(action.type) {
    case UPDATE_TEMPLATE_FIlES:
        return Object.assign({}, state, {
            templateFiles: action.data
        });
    default: 
        return state;
    }
}