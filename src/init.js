/**
 * 路由配置脚本, 编辑后一定要执行node grant 或者 npm run route
 */


exports.getRouteConfig = function () {
    return routeConfig;
};

const routeConfig = {
    'client': {
        'list_table': {
            'name': '采购类目管理',
            'key': 'client_list-table',
            'path': './pages/list_table/index.jsx',
        },
    },

};