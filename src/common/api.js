/**
 * api 
 */

import axios from 'axios';
import { isObjEmpty } from './tool.js';
import STATUS_CODE from './status_code.js';

const URLS = {
    'user-list': '/user-list',
    'tree-list': '/tree-list',
    'rms/resource/getDownloadParam': '/rms/resource/getDownloadParam',
    'common-organize-list': '/common-organize-list',
    'common-manager-list': '/common-manager-list',
    'chance-type-group-list': '/chance-type-group-list',
    'chance-type-list': '/chance-type-list',
    'search-input-list': '/search-input-list',
    'get-tip-popover-list': '/get-tip-popover-list',
};

const customHeader = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8',
};

const MthodEnum = {
    get: 'GET',
    delete: 'DELETE',
    head: 'HEAD',
    options: 'OPTIONS',
    post: 'POST',
    put: 'PUT',
    patch: 'PATCH',
    purge: 'PURGE',
    link: 'LINK',
    unlink: 'UNLINK',
};

/**
 * axios请求
 * @param  {String} path   请求路径
 * @param  {Object} data   请求参数
 * @param  {String} method 请求类型
 * @param  {Object} opts   请求选项
 * @return {Object}        Promise对象
 */
function axiosPost(apiPath, apiData, apiMethod, opts) {
    const path = apiPath;
    if (!path) return Promise.reject(new Error('无效的API地址'));
    const option = {
        method: null,
        credentials: 'include',
        headers: customHeader,
        params: {},
    };

    const method = MthodEnum[apiMethod ? apiMethod.toLowerCase() : 'get'];
    option.method = method;

    if (!isObjEmpty(apiData)) {
        option.params = apiData;
    }

    return axios(path, { ...option, ...opts }).then((res) => {
        const data = res.data;
        if (res.status !== STATUS_CODE.SUCCESS) {
            return Promise.reject(new Error(data.msg));
        }
        return Promise.resolve(data);
    });
}

export { axiosPost as fetch, URLS };
