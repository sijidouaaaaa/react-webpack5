import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { chanceTypes, users, managerGroupData, managerData } from './data/db.js';
import { chanceTypeGroupList, chanceTypeList } from './data/chance';

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        const mock = new MockAdapter(axios);

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });

        // 获取机会类型列表
        mock.onGet('/chance-type').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        data: chanceTypes
                    }]);
                }, 1000);
            });
        });

        // 获取组织架构列表
        mock.onGet('/common-organize-list').reply(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, {
                        data: managerGroupData
                    }]);
                }, 1000);
            });
        });

        // 通过组织ID获取顾问列表
        mock.onGet('/common-manager-list').reply(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, {
                        data: managerData
                    }]);
                }, 1000);
            });
        });

        // 获取用户列表
        mock.onGet('/user-list').reply(config => {
            const userName = config.params && config.params.userName || '';
            const page = config.params && config.params.page || 1;
            const pageSize = config.params && config.params.pageSize || 10;
            let userList = users.filter(user => {
                if (userName && user.userName.indexOf(userName) == -1) return false;
                return true;
            });
            const total = userList.length;
            userList = userList.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        data: { content: userList, page, total, pageSize}
                    }]);
                }, 1000);
            });
        });
        
        // 获取树级

        mock.onPost('/tree-list').reply(config => {
            const treeData = [
                {
                    industryId: '0',
                    industryName: '农、林、牧、渔业',
                    children: [
                        {
                            industryId: '0-0',
                            industryName: '农业',
                        },
                        {
                            industryId: '0-1',
                            industryName: '林业',
                        },
                        {
                            industryId: '0-2',
                            industryName: '牧业',
                        },
                        {
                            industryId: '0-3',
                            industryName: '渔业',
                        },
                        {
                            industryId: '0-4',
                            industryName: '农、林、牧、渔专业及辅助性活动'
                        }
                    ]
                },
                {
                    industryId: '1',
                    industryName: '食品行业', 
                    children: [
                        {
                            industryId: '1-0',
                            industryName: '农副食品加工业',
                        },
                        {
                            industryId: '1-1',
                            industryName: '酒、饮料和精制茶制造业',
                        },
                        {
                            industryId: '1-2',
                            industryName: '烟草制品业',
                        },
                        {
                            industryId: '1-3',
                            industryName: '食品制造业',
                        },
                    ]
                }
            ];
            // 模拟异步加载
            const treeObj = {
                '0-0': [ 
                    {
                        industryId: '0-0-0',
                        industryName: '稻谷',
                    }
                ],
                '0-1': [ 
                    {
                        industryId: '0-1-0',
                        industryName: '种树',
                    }
                ],
                '0-2': [ 
                    {
                        industryId: '0-2-0',
                        industryName: '养猪',
                    }
                ],
                '0-3': [ 
                    {
                        industryId: '0-3-0',
                        industryName: '喂鱼',
                    }
                ],
            };
            const industryId = config.params && config.params.industryId ? config.params.industryId : false;
            let datas = [];
            if(!industryId){
                datas = treeData;
            } else {
                datas = treeObj[industryId] || [];
            }
            // const datas = !industryId ? treeData : treeObj[industryId] || [];
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, {
                        data: datas
                    }]);
                }, 1000);
            });
        })

        // 获取下载地址
        mock.onGet('/rms/resource/getDownloadParam').reply(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, {
                        data: {
                            downloadUrl: "https://public-test.zbjimg.com/homesite%2Ftask%2F5.jpg%2Forigine%2F1ccd95a9-36df-4e2d-9b35-2adbfb7728d2",
                            hash: "347903c51380ede44d675ed2d9007745",
                            height: 800,
                            key: "homesite/task/5.jpg/origine/1ccd95a9-36df-4e2d-9b35-2adbfb7728d2",
                            mimetype: "image/jpeg",
                            msg: "成功",
                            storage: "qiniu",
                            width: 800,
                        }
                    }]);
                }, 1000);
            });
        });

        // 获取机会类型组列表
        mock.onGet('/chance-type-group-list').reply(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, {
                        data: chanceTypeGroupList
                    }]);
                }, 1000);
            });
        });

        // 获取机会类型列表
        mock.onGet('/chance-type-list').reply(config => {
            const chanceGroupId = config.params && config.params.chanceGroupId || '';
            let chanceList = chanceTypeList;
            if(chanceGroupId) chanceList = chanceTypeList.filter(item => item.chanceGroup == chanceGroupId);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, {
                        data: chanceList
                    }]);
                }, 1000);
            });
        });
        // ajaxInputSearch数据 
        mock.onGet('/search-input-list').reply((config) => {
            const dataList = [
                { id: 1, title: '测试' },
                { id: 2, title: '测试一' },
                { id: 3, title: '测试二' },
                { id: 4, title: '测试三' },
                { id: 5, title: '测试四' },
                { id: 6, title: 'test1' },
                { id: 7, title: 'test2' },
                { id: 8, title: 'test3' },
                { id: 9, title: 'test4' },
            ]
            const searchValue = config.params && config.params.keyWord || '';
            const filterList = dataList.filter(item => {
                if (item.title.indexOf(searchValue) === -1) return false;
                return true;
            });
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, {
                        data: filterList
                    }]);
                }, 1000);
            });
        });
        mock.onGet('/get-tip-popover-list').reply(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        data: {
                            consultTitle: '测试标题',
                            guideDetail: '<div><span style="color: red">测试</span>内容</div>'
                        }
                    }]);
                }, 1000);
            });
        });
    }
};