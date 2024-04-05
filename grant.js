/* eslint-disable no-console */
/**
 * 自动生成路由信息
 */

const fs = require('fs');
const initLoad = require('./src/init.js');
  
/**
   * 获取路由信息
   * 
   * @param {object} route 
   */
function getRouteView(route) {
    // 获取参数信息，判断是否符合自定义compent
    const hasCompent = !route.path;
    const view = [];
    if (!hasCompent) {
        // key设置规则，通过-进行拆分，将每个字母都进行首字母大写处理
        view.push(`const ${route.keyName} = abc => {require.ensure([], (require) => {const page = require('${route.path}');abc(page);}, '${route.keyName}')};`);
    } else if (route.component) {
        view.push(`import ${route.keyName} from '${route.component}';`);
    }
    return view;
}
  
/**
   * 执行过程
   * 
   * @param {object} config 
   */
function getRouteConfig(config, imports) {
    const confText = {};
    Object.keys(config).forEach((f) => {
        let route = config[f];
        if (route.key) {
            // 解析name信息
            const keys = route.key.split('-');
            route.keyName = keys.map((k) => k.slice(0, 1).toUpperCase() + k.slice(1)).join('');
            // 解析import信息
            const view = getRouteView(route);
            if (view && view.length > 0) {
                imports(view);
            }
            // 渲染信息
            if (route.path) {
                route.render = `#${route.keyName}#`;
                delete route.path;
            } else if (view && view.length > 0) {
                route.component = `#${route.keyName}#`;
            }
            // 判断是否有childern信息，识别children的方式方法
            const hasNext = route.children ? true : false;
            if (hasNext) {
                route.children = getRouteConfig(route.children, imports);
            }
        } else {
            // 直接解析内容数据, 按照value进行解析
            route = getRouteConfig(route, imports);
        }
        confText[f] = route;
        if (route.key) {
            confText[f].location = f + (route.symbol || '');
        }
    });
    return confText;
}
  
/**
   * 解析生成文件
   */
function init() {
    const routeConfig = initLoad.getRouteConfig();
    // 先写入import内容信息
    let fileText = '\'use strict;\'\r\n/**由命令node grant OR npm run route自动生成无需编辑*/\r\n';
    // 解析数据信息
    const confText = getRouteConfig(routeConfig, (view) => {
        view.forEach((v) => {
            fileText += v + '\r\n';
        });
    });
    // 在写入配置信息内容
    fileText += `exports.routeConfig = ${JSON.stringify(confText).replace(/"#/g, '').replace(/#"/g, '')};\r\n`;
    fs.writeFile('./app/build/route_init.js', fileText, 'utf8', () => {
        console.log('自动生成路由信息成功');
    });
}
  
init();