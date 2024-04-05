'use strict;'
/**由命令node grant OR npm run route自动生成无需编辑*/
const Client_listTable = abc => {require.ensure([], (require) => {const page = require('./pages/list_table/index.jsx');abc(page);}, 'Client_listTable')};
exports.routeConfig = {"client":{"list_table":{"name":"采购类目管理","key":"client_list-table","keyName":"Client_listTable","render":Client_listTable,"location":"list_table"}}};
