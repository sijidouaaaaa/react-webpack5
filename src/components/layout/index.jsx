/*
   布局组件
   秦国胜
   2019-06-08
*/
import React, { Component } from 'react';
import './style.less';
import Header from './components/header';
import Sider from './components/sider';
import Footer from './components/footer';
class Layout extends Component {
   render () {
      return (
         <div className = {'layout'} >
            <Header />
            <section className = 'layout-container'>
               <Sider />
               <div className = 'layout-main'>
                  { this.props.children }
                  <Footer />
               </div> 
            </section>
         </div>
      );
   }
}
export default Layout;