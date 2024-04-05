// 工具函数

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
        showTotal: function (total) {
            return `共有 ${total} 条记录`;
        },
        pageSizeOptions: ['10', '50', '100'],
    };
}

/**
 * 获取表格过滤项
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          过滤数组
 */
export function getEnumsArray(enumObj, labelText = 'text', valueText = 'value' ) {
    return Object.keys(enumObj).map(function (key) {
        let obj = {};
        obj[labelText] = enumObj[key];
        obj[valueText] = key;
        return obj;
    });
}