// let root =document.getElementById('root')
// root.innerHTML='my-project(webpack+react)!!!!!!!!'

import React, { Component } from 'react';
import './assets/less/app.less';
// import BJImage from '@/assets/images/R-C.jpg'
import './App.css';
import ListTable from './pages/list_table/index.jsx'

class App extends Component {
  componentDidMount(){
    // let element = document.getElementById('box2');
    // let myImage = new Image();
    // myImage.src = BJImage;
    // element.appendChild(myImage)
    // console.log('1111111111111111111111');
  }

  render() {
    return (
      <div className='box'>
       <ListTable/>
      </div>
    );
  }
}

export default App;
