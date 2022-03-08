import './index.less'
import MenuItem from './MenuItem';
import config from './config';
import { useState } from 'react';

export default function MainMenu() {
  const [activeKey, setActiveKey] = useState("doing")

  return (
    <div className='main-menu'>
      <div><h1 className="title">主菜单</h1></div>
      {
        config.map((item) => (
          <MenuItem
            name={item.name}
            key={item.key}
            active={activeKey === item.key}   // 判断是否选中，选中的话添加一个选中的样式
            count={item.count}
            onClick={() => {
              setActiveKey(item.key)  // 变化activeKey以改变样式
            }} />
        ))
      }

    </div>
  );
}
