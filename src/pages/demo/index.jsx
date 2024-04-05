/**
 * 快捷导航
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Tabs, Button, Divider, Descriptions, Tooltip, Select, Row, Col } from 'antd';

// 路由信息
import { getRouteConfig } from '../../init.js';

/**
  * 获取路由链接信息
  * 
  * @param {object} config 
  * @param {object} parent 
  */
function getRouteLink(config, parent) {
    const result = { other: [], routes: [] };
    const _parent = (parent || {});
    const pKey = _parent.key || '';
    const level = _parent.level || 0;
    const _client = _parent.client || config.client;
    Object.keys(config).forEach((k) => {
        const _vl = {};
        const rou = config[k];
        _vl.name = rou.name;
        _vl.showName = rou.name || k;
        _vl.key = k;
        _vl.pKey = pKey;
        _vl.file = rou.path;
        _vl.level = level + 1;
        _vl.client = _client;
        if (rou.path || rou.component) {
            const _nKey = (pKey ? pKey + '/' : '') + k + '/';
            _vl.path = _client + _nKey;
        }
        if (rou.children) {
            const _rt = getRouteLink(rou.children, _vl);
            // 结果信息
            if (parent) {
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(_vl);
            } else {
                _vl.children = _rt.routes;
            }
        } else if (!parent) {
            _vl.pKey = '1';
            _vl.path ?
                result.other.push(_vl)
                :
                '';
            return;
        }
        result.routes.push(_vl);
    });

    // 需要合并到routes中
    if (result.other.length) {
        result.routes.unshift({
            key: '1',
            name: '其他链接',
            children: result.other
        });
    }
    return result;
}

/**
  * 自动解析数据路由信息
  */
function getRouteSelect(config) {
    const select = [];
    let machine = {
        'mobile': '移动端',
        'client': '电脑端'
    };
    // 先解析当前第一层是否符合统一规则
    Object.keys(config).forEach((r) => {
        const _route = config[r];
        if (!_route.key) {
            // 说明改层次属于为r
            _route.client = '/' + r + '/';
            select.push({
                name: _route.name || _route.client,
                // group: !_route.group && r === 'mobile' ? '' : '电脑端',
                group: !_route.group ? machine[r] : '电脑端',
                value: r
            });
        }
    });
    // 检查当前selec是否存在默认值
    if (!select.length) {
        select.push({
            name: '/client/',
            group: '电脑端',
            value: 'client'
        });
    }

    // 根据group进行组装数据
    let selectGroup = {};

    select.forEach((t) => {
        const group = selectGroup[t.group] || [];
        group.push(t);
        selectGroup[t.group] = group;
    });

    return selectGroup;
}

function propMap(state, ownProps) {
    return {
        modal: state.modal,
        routing: ownProps
    };
}

//封装组件
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: null,
            selectRoute: 'client',
            clientSwitch: false
        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }
    render() {
        const { showText, selectRoute } = this.state;
        console.log('getRouteConfig',getRouteConfig());
        // 解析所有的结果内容保障其展示数据
        const rConfig = getRouteConfig();
        console.log('getRouteConfig1111111111111111111111',rConfig);
        const height = document.body.clientHeight - 170;
        // 获取下来选择的路由切换
        const selectGroups = getRouteSelect(rConfig);
        console.log('selectGroups222222222222222222222222222',selectGroups);
        // 获取选择的路由信息
        const renderStore = getRouteLink(rConfig[selectRoute]);
        const selectGroupsArry = Object.keys(selectGroups);
        return (<Fragment>
            <Row>
                <Col className='p-r'><h1>快捷入口</h1></Col>
                {
                    selectGroupsArry && selectGroupsArry.length > 1 ?
                        <Col>
                            <Select style={{ minWidth: 120 }}
                                showSearch
                                value={selectRoute}
                                onChange={this.handleRouteChange}
                            >
                                {
                                    selectGroupsArry.map((g, idx) => {
                                        const group = selectGroups[g];
                                        return <Select.OptGroup label={g} key={idx}>
                                            {
                                                group.map((p, vdx) => {
                                                    return <Select.Option
                                                        value={p.value}
                                                        key={vdx + '-' + p.value}>{p.name}</Select.Option>;
                                                })
                                            }
                                        </Select.OptGroup>;
                                    })
                                }
                            </Select>
                        </Col>
                        :
                        null
                }
            </Row>
            <Card bordered={false}>
                <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ height: height }}
                    items={
                        renderStore.routes.map((r) => {
                            return ({
                                label: r.name || r.key,
                                key: r.key,
                                children: <Fragment>
                                    {
                                        r.path ?
                                            <Tooltip title={r.name || r.key} placement="bottom" key={0} onOpenChange={(visible) => this.handleVisibleChange(r, visible)}>
                                                <Button 
                                                    href={r.path} 
                                                    target='_blank'
                                                    className="m-r-hg m-b-lg" 
                                                    type="primary"
                                                    rel="noopener noreferrer"
                                                >当前页</Button>
                                            </Tooltip> : ''
                                    }
                                    {
                                        r.children.map((c) => {
                                            return <Tooltip title={c.name || c.key} placement="bottom" key={c.key} onOpenChange={(visible) => this.handleVisibleChange(c, visible)}>
                                                <Button  target='_blank' rel="noopener noreferrer" href={c.path} className="m-r-hg m-b-lg">{c.showName}</Button>
                                            </Tooltip>;
                                        })
                                    }
                                    <Divider dashed plain orientation="left" style={{ marginTop: '60px' }}>链接信息</Divider>
                                    {
                                        showText && (showText.key == r.key || showText.pKey == r.key) ? <Descriptions column={1}>
                                            <Descriptions.Item label="路由名称">{showText.showName}</Descriptions.Item>
                                            <Descriptions.Item label="路由级别">{showText.level}</Descriptions.Item>
                                            <Descriptions.Item label="路由文件">{showText.file}</Descriptions.Item>
                                            <Descriptions.Item label="路由地址">
                                                <a href={showText.path}  target='_blank' rel="noopener noreferrer">{showText.path}</a>
                                            </Descriptions.Item>
                                        </Descriptions> : null
                                    }
                                </Fragment>
                            });
                        })
                    }
                />
            </Card>
        </Fragment>);
    }
    handleVisibleChange(route) {
        this.setState({ showText: route });
    }
    handleRouteChange(value) {
        this.setState({ selectRoute: value });
    }
}

Test.propTypes = {
    routing: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(propMap)(Test);