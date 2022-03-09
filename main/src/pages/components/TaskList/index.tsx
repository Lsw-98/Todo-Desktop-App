import './index.less'
import TaskItem from './TaskItem';
import { DatePicker, Input, Tag } from 'antd'
import { PlusIcon } from '@/components/Icon';
import { useState } from 'react'

export default function TaskList() {
  // isCreate：任务是否正在创建
  const [isCreate, setIsCreate] = useState(false)

  /*
  * value: 选择的时间
  * dateString: 格式化日期，例如：2022-03-02 14:16:33
  */
  const onChange = (value: any, dateString: string) => {

  }

  /*
  * value: 选择的时间
  */
  const onOk = (value: any) => {

  }

  return (
    <div className='task-list'>
      <div>
        <h1 className="title">任务列表</h1>
      </div>
      <div className={`add-task-container ${isCreate ? 'add-task-container-active' : ''}`}>
        <div className='standard-container create-input'>
          {/* 添加任务图标 */}
          <PlusIcon />
          {/* 
          创建任务输入框
          onBlur：事件会在对象失去焦点时发生
         */}
          <Input
            placeholder='创建任务'
            onFocus={() => { setIsCreate(true) }}
            // onBlur={() => { setIsCreate(false) }}
            style={{ marginLeft: "10px" }} />
        </div>
        {
          isCreate && <div className='time-tags'>
            <Tag color="geekblue">今天</Tag>
            <Tag color="green">明天</Tag>
            <Tag color="volcano">其他时间</Tag>
          </div>
        }
      </div>
      {/* 
        时间选择器，用于设置任务开始时间以及结束时间
      */}
      {/* <DatePicker showTime onChange={onChange} onOk={onOk} placeholder="选择任务结束时间" /> */}
      <div className='task-item-container'>
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
      </div>
    </div>
  );
}
