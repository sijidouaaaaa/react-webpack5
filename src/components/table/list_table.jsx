
import React, { useState } from 'react';
import { Table, Button, Space ,Popconfirm  } from 'antd';



const ListTable = () => {
    // const { defaultValue, } = props;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    // 表格数据
    const [dataSource, setDataSource] = useState([
        {
            key: 1,
            name: 'Edward King 0',
        },
    ]);
    // 表格行
    const defaultColumns = [{
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (_, record) => (
            dataSource.length >= 1 ?
                <Space size="middle">
                    <Button type="text">Edit</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
                : null

        ),
    },
    ]
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
      });
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    // 选择全部
    const allData = () => {
        console.log('点击选择全部事件');
    }
    return (
        <>
            <Button type="text"
                onClick={allData}
            >
                All
            </Button>
            <Table
                rowSelection={rowSelection}
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    pageSize: 5,
                }}
                scroll={{
                    y: 300,
                }}
            />
        </>);
};

export default ListTable;