import React, { Component } from 'react'
import { Button, Col, Form, Input } from 'antd';


import ListTable from '../../components/table/list_table.jsx'


const FormItem = Form.Item

class list_table extends Component {
    
    // 提交搜索
    onFinish = (values) => {
        console.log('e', values);
        let result = {};
        // 关键字
        values.keyword ?
            result.keyword = values.keyword : '';
        
        console.log('resultresult这是搜索的数据', result);
        
    }
    // 重置 
    onReset = () => {
        console.log('onReset重置表单数据啦',);
        this.formRef.resetFields();
    }

    render() {
        return (
            <div className='box1'>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    ref={ref => this.formRef = ref}
                    autoComplete="off"
                >
                    <FormItem
                        label=""
                        name="keyword"
                    >
                        <Input
                           enterbutton={'true'}
                            placeholder='Add a new task'
                            allowClear
                        />
                    </FormItem>
                    <Col className='text-right'> 
                     <FormItem>
                        <Button className='m-l' type="primary" onClick={this.onReset}>
                            Clear All
                        </Button>
                    </FormItem>
                    </Col>
                </Form>
                {/* 表格 */}
                <ListTable 
                // data={newData}
                />
            </div>
        )
    }
}
export default list_table