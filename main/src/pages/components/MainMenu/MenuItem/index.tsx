/*
* 侧边栏Item组件
*/

import { ReactNode } from 'react';
import './index.less'

// 对props进行类型限制
interface IProps {
  name: string    // 任务名称
  count: number   // 计数器
  active: boolean // 是否处于激活（选中）状态
  icon?: () => ReactNode   // 图标
  onClick: () => void
}

export default function MenuItem(props: IProps) {
  const { name, count, icon, active, onClick } = props

  return (
    <button className={`menu-item ${active ? 'menu-item-active' : ''}`} onClick={onClick}>
      {icon?.()}
      <span className='menu-item-name'>{name}</span>
      {/* 显示任务数量 */}
      {
        name !== "日历" && <span className='menu-item-count'>{count}</span>
      }
    </button>
  );
}
