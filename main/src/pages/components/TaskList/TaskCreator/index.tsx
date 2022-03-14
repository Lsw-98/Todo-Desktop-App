import { PlusIcon } from '@/components/Icon'
import { Button, Input } from 'antd'
import { useState } from 'react'
import QuickDateFormat from '../QuickDateFormat'
import './index.less'
import moment from 'moment'
import { TaskType } from '..'
import { TASK_STATUS } from '@/const'

interface IProps {
  onCreate: (task: TaskType) => void
}

export default function TaskCreator(props: IProps) {
  // isCreate：任务是否正在创建，若正在创建则显示任务创建列表
  const [isCreate, setIsCreate] = useState(false)
  // curTitle：创建任务的标题
  const [curTitle, setCurTitle] = useState('')
  // ddl：格式化后的日期
  const [ddl, setDdl] = useState<moment.Moment>(moment())
  const { onCreate } = props

  const handleCreate = () => {
    const taskID = Date.now().toString()
    const newTask: TaskType = {
      title: curTitle,
      desc: '',
      startTime: moment(),
      endTime: ddl,
      taskID,
      status: TASK_STATUS.DOING,
      finishTime: '',
    }

    // 任务创建成功，收起任务创建列表
    setIsCreate(false)
    // 清空输入框内容
    setCurTitle('')
    onCreate?.(newTask)
  }

  return (
    <div className={`add-task-container ${isCreate ? 'add-task-container-active' : ''}`}>
      <div className='standard-container create-input'>
        {/* 添加任务图标 */}
        <PlusIcon />
        {/* 
            创建任务输入框
          */}
        <Input
          placeholder='创建任务'
          onFocus={() => { setIsCreate(true) }}
          style={{ marginLeft: "10px" }}
          // 加上onChange和value属性，使Input变为受控组件
          // 将输入框内容赋值给title
          onChange={event => { setCurTitle(event.target.value) }}
          value={curTitle} />
      </div>
      {
        isCreate && (
          <div>
            <QuickDateFormat
              value={ddl}
              onChange={(m) => { setDdl(m) }}
            />
            <div className='operation-btns'>
              <Button
                danger
                size='small'
                // 撤销，将创建列表隐藏
                onClick={() => { setIsCreate(false); setCurTitle('') }}
                style={{ margin: '5px' }}>
                撤销
              </Button>
              <Button
                type="primary"
                size='small'
                onClick={handleCreate}
                // 若title为空，则不可创建
                disabled={curTitle === ''}
              >
                创建
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
}
