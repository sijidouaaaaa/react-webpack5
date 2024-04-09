// 工具函数

import { addressData } from '../enums/city_data';
import { URLS } from './api';

// 日志方法
export const log = window.console;

let diff = 0;

export function setTimeDiff(curDate) {
    diff = new Date().getTime() - new Date(curDate).getTime();
}


/**
 * 获取当前路由参数
 * @param  {Object} routing 路由对象
 * @return {Object}         返回请求参数
 */
export function getQuery(routing) {
    return routing.location.query || {};
}

/**
 * 获取跳转路径
 * @param  {String} path 路径地址
 * @return {String}      正确路径
 */
export function getPath(path) {
    if (!/^\//.test(path)) {
        path = '/' + path;
    }
    return pathPrefix + path;
}
/**
 * 获取apiPath
 */
export function getApiPath(apiMethod) {
    if (!URLS[apiMethod]) {
        return '';
    }
    return URLS[apiMethod];
}

/**
 * 获取标准分页数据
 * @param  {Object} data 源数据
 * @return {Object}      标准分页数据
 */
export function getPageData(data) {
    return {
        current: data.page,
        total: data.total,
        pageSize: data.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal(total) {
            return `共有 ${total} 条记录`;
        },
        pageSizeOptions: data.pageSizeOptions ? data.pageSizeOptions : ['10', '50', '100'],
    };
}

/**
 * 通过枚举获取数组
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          数组
 */
export function getEnumsArray(enumObj) {
    return Object.keys(enumObj).map(function (key) {
        return {
            text: enumObj[key],
            value: key,
        };
    });
}



/**
 * 序列化化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
export function serialize(data) {
    let str = '';
    Object.keys(data).forEach((key) => {
        str += `${key}=${encodeURIComponent(data[key])}&`;
    });
    str = str.replace(/&$/, '');
    return str;
}

/**
 * 查询是否为空对象
 * @param  {Object}  obj 查询对象
 * @return {Boolean}     查询结果
 */
export function isObjEmpty(obj) {
    // Speed up calls to hasOwnProperty
    const { hasOwnProperty } = Object.prototype;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    let result = true;
    Object.keys(obj).forEach((key) => {
        if (hasOwnProperty.call(obj, key)) {
            result = false;
        }
    });

    return result;
}




/**
 * 过滤空数据
 */
export function filterEmptyData(data) {
    if (!data) return data;
    const filterData = data;
    Object.keys(filterData).forEach((inx) => {
        if (
            filterData[inx] === 'undefined' ||
      filterData[inx] === undefined ||
      filterData[inx] === null ||
      filterData[inx] === '' ||
      filterData[inx].length === 0
        )
            delete filterData[inx];
    });
    return filterData;
}

/**
 * 去除字符串空格
 */
export function trim(str, position) {
    const type = Object.prototype.toString.call(str).slice(8, -1);
    if (type !== 'String') return str;
    let result = '';
    switch (position) {
    case 'before': // 前
        result = str.replace(/(^\s*)/g, '');
        break;
    case 'after': // 后
        result = str.replace(/(\s*$)/g, '');
        break;
    case 'both': // 前后
        result = str.replace(/(^\s*)|(\s*$)/g, '');
        break;
    default:
        // 所有
        result = str.replace(/\s*/g, '');
    }
    return result;
}

// 判断数据类型
export const isType = (target) => {
    return Object.prototype.toString.call(target).slice(8, -1);
};

// 判断两个对象是否相等
export const isEqual = (obj1, obj2) => {
    const t1 = obj1 instanceof Object;
    const t2 = obj2 instanceof Object;
    if (!t1 || !t2) {
    // 如果不是数组或对象，直接判断数据是否相等
        return obj1 === obj2;
    }
    // 判断对象的可枚举属性组成的数组长度
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }
    for (const attr in obj1) {
        const t3 = isType(obj1[attr]) === 'Object';
        const t4 = isType(obj2[attr]) === 'Object';
        const t5 = isType(obj1[attr]) === 'Array';
        if (t3 && t4) {
            // 如果是对象继续判断
            return isEqual(obj1[attr], obj2[attr]);
        }
        if (t5) {
            // 如果是数组
            if (obj1[attr].toString() !== obj2[attr].toString()) {
                return false;
            }
        } else if (obj1[attr] !== obj2[attr]) {
            // 不是数组或对象的就判断数值是否相等
            return false;
        }
    }
    return true;
};

// 返回省份数据
function getProvinceData() {
    return addressData.map(function (data) {
        return {
            value: data.value,
            label: data.label,
        };
    });
}

// 返回城市数据
function getCityData() {
    const copyData = [].concat(JSON.parse(JSON.stringify(addressData)));
    const { length } = copyData;
    for (let i = 0; i < length; i++) {
        const mapData = copyData[i].children;
        const children = mapData.map(function (data) {
            return {
                value: data.value,
                label: data.label,
            };
        });
        copyData[i].children = children;
    }
    return copyData;
}

const provinceData = getProvinceData();
const cityData = getCityData();

export function getCityTreeData(level) {
    if (level === 1) {
        return provinceData;
    }
    if (level === 2) {
        return cityData;
    }
    return addressData;
}

/**
 * 防抖函数(防止目标函数过于频繁的调用)
 * @param {*} func 目标函数
 * @param {*} wait 延迟时间ms
 * @param {*} immediate 是否立即执行
 */
export function debounce(func, wait, immediate = false) {
    let time; // 定时器变量
    const debounced = function (event, ...args) {
        const context = this;
        if (time) clearTimeout(time); // 每次触发时先清除上一次的定时器,然后重新计时
        if (event.persist) event.persist(); // 保留对事件的引用
        if (immediate) {
            const callNow = !time;
            if (callNow) func.apply(context, args);
            time = setTimeout(
                () => {
                    time = null;
                }, // 手动将其设置为 null, 便于垃圾收集器下次运行时将其回收
                wait,
            );
        } else {
            time = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    };

    debounced.cancel = function () {
        clearTimeout(time);
        time = null;
    };
    return debounced;
}

/**
 * @function openNewWindow 模拟提交form打开新窗口
 */
export function openNewWindowByForm(url) {
    const form = document.createElement('form');
    form.action = url;
    form.target = '_blank';
    form.method = 'POST';
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}
/**
 * @function openNewWindowByA a标签打开新窗口
 */
export function openNewWindowByA(url) {
    const newA = document.createElement('a');
    newA.id = 'new_a';
    newA.target = '_blank';
    newA.href = url;
    newA.rel = 'noopener noreferrer';
    document.body.appendChild(newA);
    newA.click();
    document.body.removeChild(newA);
}

// 解析 xss 转义
export function HTMLDecode (text) { 
    let temp = document.createElement('div'); 
    temp.innerHTML = text; 
    let output = temp.innerHTML || temp.innerText || temp.textContent; 
    temp = null; 
    return output; 
} 