
// import { fetch, axios } from '@common/api';
import { modalUpdate } from './modal';

import { message } from 'antd';


export const UPDATE_TEMPLATE_FIlES = 'UPDATE_TEMPLATE_FIlES';

/**
 * 更新获取模板文件地址列表
 */
export function updateTemplateFileList(data) {
    return {
        type: UPDATE_TEMPLATE_FIlES,
        data
    };
}

/**
 * 获取模板文件地址
 */
export function getTemplateFiles(query, cb) {
    return function(dispatch) {
        fetch('get-template-files', query)
            .then(res => {
                dispatch(updateTemplateFileList(res.data));
                cb && cb(res.data);
            }).catch(() =>{
                message.error('获取模板文件列表失败！');
            });
    };
}