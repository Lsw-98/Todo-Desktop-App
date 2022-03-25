/**
* todoList侧边栏组件
*/

import './index.less'
import MenuItem from './MenuItem';
import config from './config';

interface IProps {
  activeKey: number
  onChange: (key: number) => void
  countResult: Record<string, number>
}

export default function MainMenu(props: IProps) {
  const { onChange, activeKey, countResult } = props

  return (
    <div className='main-menu'>
      <div className="main-menu-content">
        {
          config.map((item) => (
            <MenuItem
              name={item.name}
              key={item.key}
              active={activeKey === item.key}   // 判断是否选中，选中的话添加一个选中的样式
              count={countResult[item.apiKey]}
              onClick={() => {
                onChange(item.key)  // 变化activeKey以改变样式
              }}
              icon={item.icon}
            />
          ))
        }
      </div>
    </div>
  );
}
