/**
 * 顶部菜单栏组件
 */

import { SortIcon } from '@/components/Icon'
import { MENU_KEY } from '@/const'
import { Dropdown, Menu, Popover } from 'antd'
import './index.less'

interface IProps {
  tab: number   // 菜单栏状态
  onClick: (key: string) => void  
}

export default function TaskToolBar(props: IProps) {
  const { tab, onClick } = props

  const menu = (
    <Menu onClick={(item) => onClick(item.key)}>
      <Menu.Item key="sort-start">按任务开始时间</Menu.Item>
      <Menu.Item key="sort-end">按任务截止时间</Menu.Item>
    </Menu>
  );

  // 如果是进行中或者已完成，则显示任务排序按钮
  const renderTools = () => {
    if ([MENU_KEY.DOING, MENU_KEY.DONE].includes(tab)) {
      return (
        <Dropdown overlay={menu} placement="bottom">
          <div className="task-tool-bar-sort">
            <SortIcon active={false} />
          </div>
        </Dropdown>
      )
    }
  }

  return (
    <div className='task-tool-bar'>
      <div className='task-tool-bar-content'>
        {
          renderTools()
        }
      </div>
    </div >

  )
}
