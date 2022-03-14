/*
* todoList侧边栏组件
*/

import './index.less'
import MenuItem from './MenuItem';
import config from './config';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import apiConfig from '@/api/config';

interface IProps {
  activeKey: number
  onChange: (key: number) => void
  updateFlag: number
}

export default function MainMenu(props: IProps) {
  const { onChange, activeKey, updateFlag } = props
  const [countResult, setCountResult] = useState<Record<string, number>>({
    'doing': 0,
    'done': 0,
  })

  useEffect(() => {
    getCount()
  }, [updateFlag])

  const getCount = () => {
    api(apiConfig.count.url).then(res => {
      setCountResult(res.data)
    })
  }

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
