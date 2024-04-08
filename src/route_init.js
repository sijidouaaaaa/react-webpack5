'use strict;'
/**由命令node grant OR npm run route自动生成无需编辑*/
const ClientListTable = abc => {require.ensure([], (require) => {const page = require('./pages/list_table/index.jsx');abc(page);}, 'ClientListTable')};
const ClientListTableDetail = abc => {require.ensure([], (require) => {const page = require('./pages/list_table/detail.jsx');abc(page);}, 'ClientListTableDetail')};
const ClientLabout = abc => {require.ensure([], (require) => {const page = require('./pages/about/index.jsx');abc(page);}, 'ClientLabout')};
const ClientContact = abc => {require.ensure([], (require) => {const page = require('./pages/contact/index.jsx');abc(page);}, 'ClientContact')};
exports.routeConfig = {"client":{"list_table":{"name":"列表页面","key":"client-list-table","children":{"detail":{"name":"详情页面","key":"client-list-table-detail","keyName":"ClientListTableDetail","render":ClientListTableDetail,"location":"detail"}},"keyName":"ClientListTable","render":ClientListTable,"location":"list_table"},"about":{"name":"关于页面","key":"client-labout","keyName":"ClientLabout","render":ClientLabout,"location":"about"},"contact":{"name":"关联页面","key":"client-contact","keyName":"ClientContact","render":ClientContact,"location":"contact"}}};
