  // 订单批量付款

import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getPath, getPageData, getProjectUrl, 
    // calculator
} from '@common/tool';
import { formatPrice  } from '@common/format_tool';

import { getPurchaseOrderPayList, batchPayOrderPurchaseRecord } from '@actions/order_payment';

import PageTitle from '@components/view/page_title';
import OrderPaymentSearchForm from '@components/form/order_payment_search_form';


import { Spin, Table, message, Button } from 'antd';


function OrderPayment (props) {
    const { modal, dispatch } = props;
    // 表格列
    const columns = [
        {
            title: '采购订单ID',
            dataIndex: 'purchaseOrderId',
            render: (val, row) => {
                return val ? 
                    <a 
                        href={ getProjectUrl('self', getPath('/supplier-order-manage/detail/?id=' + row.purchaseOrderId))}
                        target="_blank"
                        rel="noopener noreferrer"
                    >{val}</a>
                    :
                    null;
            }
        },
        {
            title: '来源服务ID',
            dataIndex: 'caseId',
            render: (val) => {
                return val ?
                    <a 
                        href={getProjectUrl('order-detail', val)} 
                        target="_blank"
                        rel="noopener noreferrer">{val}</a>
                    :
                    null;
            }
        },
        {
            title: '采购商品名称',
            dataIndex: 'goodsName',
        },
        {
            title: '客户公司名称',
            dataIndex: 'customerName',
            render: (val, row) => {
                return val ?
                    <a 
                        href={getProjectUrl('customer-detail', row.customerId)} 
                        target="_blank"
                        rel="noopener noreferrer">{val}</a>
                    :
                    null;
            }
        },
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
        },
        {
            title: '服务状态',
            dataIndex: 'serviceStatusName',
        },
        {
            title: '交付顾问',
            dataIndex: 'deliverManagerName',
        },
        {
            title: '销售顾问',
            dataIndex: 'salesManagerName',
        },
        {
            title: '采购主体',
            dataIndex: 'accTypeMainPartName',
        },
        {
            title: '采购价格',
            dataIndex: 'purchasePrice',
            render: (val) => formatPrice(val || 0)
        },
        {
            title: '付款方式',
            dataIndex: 'paymentMethodName'
        },
        {
            title: '付款金额',
            dataIndex: 'payAmount',
            render: (val) => formatPrice(val || 0)
        }
    ];
    // 数据
    const [tableData, setTableData] = useState({
        content: [],
        pageNum: 1,
        pageSize: 10,
        total: 0
    });
    //  查询参数
    const [queryParams, setQueryParams] = useState({});
    // 选中的key 
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);  
    // 付款弹窗显示
    const [payTipModalVisible, setPayTipModalVisibles] = useState(false);  
    // 选中的行
    const [selectedRow, setSelectedRow] = useState([]);  
    useEffect(() => {
        getTableList();
    }, []);
    // 查询数据
    const getTableList = (queryParams = {}, pageNum = 1, pageSize = 10) => {
        dispatch(getPurchaseOrderPayList({
            ...queryParams,
            pageNum,
            pageSize,
        },
        (res) => {
            let content = [];
            if(res.content && res.content.length) {
                res.content.forEach((item, index) => {
                    content.push({
                        ...item,
                        key: item.purchaseOrderId + '-' + index
                    });
                });
            }
            setTableData({
                ...res,
                content
            });
        }));
    };
    // 表单搜索
    const handleOnFinish = (queryParams) => {
        setQueryParams(queryParams);
        setSelectedRowKeys([]);
        setSelectedRow([]);
        getTableList(queryParams);
    };
    // 监听分页
    const handlePageClick = (page) => {
        setSelectedRowKeys([]);
        setSelectedRow([]);
        getTableList(queryParams, page.current, page.pageSize);
    };
    // 监听批量付款
    const handleChangeRow = (keys, rows) => {
        console.log('监听批量付款1111111111111111');
    };
    // 批量付款-- 提示弹窗显示与关闭
    const handlePaymentAll = (open) => {
        setPayTipModalVisibles(open);
    };
    // 批量付款-- 操作
    const paymentAll = (values) => {
        let recordIds = [];
        values.defaultValue.forEach(item => {
            recordIds.push(item.recordId);
        });
        let sendData = {
            recordIds,
        };
    };
    return (
        <div className='order-payment-container'>
            <Spin spinning ={modal.loadingTable || false}>
                <PageTitle
                    title='采购订单批量付款'
                />
                <OrderPaymentSearchForm 
                    handleOnFinish={handleOnFinish}
                />
                <div className='p-b-lg'>
                    <Button  
                        disabled={selectedRow && selectedRow.length ? false : true}
                        type="primary"
                        onClick={handlePaymentAll}
                    
                    >批量付款</Button>
                </div>
                <Table
                    bordered
                    dataSource={tableData.content || []} 
                    columns={columns}
                    pagination={getPageData(tableData)}
                    onChange={handlePageClick}
                    scroll={{ x: 1200 }}
                    rowKey="key"
                    rowSelection={{
                        selectedRowKeys,
                        onChange: handleChangeRow
                    }}
                />
            </Spin>
        </div>
    );
}

function propMap(state, ownProps) {
    return {
        modal: state.modal,
        routing: ownProps
    };
}

export default  connect(propMap)(OrderPayment);