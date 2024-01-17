// let root =document.getElementById('root')
// root.innerHTML='my-project(webpack+react)!!!!!!!!'

import React, { Component } from 'react';
import './assets/less/app.less';
import BJImage from '@/assets/images/R-C.jpg'

class App extends Component {
  componentDidMount(){
    let element = document.getElementById('box2');
    let myImage = new Image();
    myImage.src = BJImage;
    element.appendChild(myImage)
    console.log('1111111111111111111111');
  }

  render() {
    return (
      <div className='box'>
        我的my-project项目 webpack+React
        <div className='box1'> 
        my-project项目盒子1
        </div>
        <div id='box2'> 
        my-project项目盒子2
        </div>
      </div>
    );
  }
}

export default App;
