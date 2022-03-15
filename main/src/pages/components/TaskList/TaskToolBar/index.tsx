import { CalendarIcon, ListIcon } from '@/components/Icon'
import { VIEW_MODE } from '@/const'
import { Calendar } from 'antd'
import { useState } from 'react'
import './index.less'

interface IProps {

}

export default function TaskToolBar(props: IProps) {

  // 任务列表菜单栏状态
  const [viewMode, setViewmode] = useState(VIEW_MODE.LIST)

  return (
    <div className='task-tool-bar'>
      <div className='task-tool-bar-content'>
        <div className="task-tool-bar-list">
          <ListIcon />
        </div>
        <div className='task-tool-bar-calendar'>
          <CalendarIcon />
        </div>
      </div>
    </div >

  )
}
