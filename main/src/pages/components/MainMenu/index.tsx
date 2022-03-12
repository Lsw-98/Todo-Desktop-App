/*
* todoList侧边栏组件
*/

import './index.less'
import MenuItem from './MenuItem';
import config from './config';
import { useState } from 'react';

export default function MainMenu() {
  const [activeKey, setActiveKey] = useState("doing")

  return (
    <div className='main-menu'>
      <div className="main-menu-content">
        {
          config.map((item) => (
            <MenuItem
              name={item.name}
              key={item.key}
              active={activeKey === item.key}   // 判断是否选中，选中的话添加一个选中的样式
              count={item.count}
              onClick={() => {
                setActiveKey(item.key)  // 变化activeKey以改变样式
              }}
              icon={item.icon}
            />
          ))
        }
      </div>
    </div>
  );
}
