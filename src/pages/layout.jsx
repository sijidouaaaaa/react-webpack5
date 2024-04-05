// 布局组件
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {Spin } from 'antd';


import '../style/main.less';

// 组件
import { Layout } from 'antd';
const { Content } = Layout;

function propMap(state) {
    return {
        modal: state.modal
    };
}

//封装组件
class LayoutPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const productId = 86; //TODO:修改
        const { modal, children } = this.props;
        let $pageWarn = null;

        return (
            <Spin spinning={modal.loading}>
                <div className="app-layout">
                    <Layout>
                        <Layout>
                            <Content style={{ padding: 24, background: '#fff' }}>
                                {$pageWarn}
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Spin>
        );
    }

}

LayoutPage.propTypes = {
    modal: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
};

export default connect(propMap)(LayoutPage);