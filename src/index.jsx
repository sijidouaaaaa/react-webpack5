// 入口文件 
import React from 'react';
import { createRoot } from 'react-dom/client'; // 18 用法
//加载页面
import AppRouter from './router.jsx'; // 载入路由

import App from './app.js';

import {setTimeDiff} from './common/tool.js';


setTimeDiff(document.getElementById('app').getAttribute('data-date'));

const container = document.getElementById('app');
const root = createRoot(container);

// root.render(<App/>);
root.render(AppRouter);
