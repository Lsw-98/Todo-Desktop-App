import './index.less'
import TaskItem from './TaskItem';
import { DatePicker, Input, Tag, Button, Drawer } from 'antd'
import { PlusIcon } from '@/components/Icon';
import { useMemo, useState } from 'react'
import moment from 'moment'
import { quickTimeConfig } from './config';

type TaskType = {
  taskID: string  // 任务ID
  title: string  // 任务标题
  desc: string  // 任务描述
  endTime: moment.Moment   // 结束时间
}

export default function TaskList() {
  // isCreate：任务是否正在创建，若正在创建则显示任务创建列表
  const [isCreate, setIsCreate] = useState(false)
  // ddl：格式化后的日期
  const [ddl, setDdl] = useState<moment.Moment>(moment())
  // tasks：创建的任务
  const [tasks, setTasks] = useState<TaskType[]>([])
  // curTitle：创建任务的标题
  const [curTitle, setCurTitle] = useState('')
  // activeTask：创建后的任务是否被选中
  const [activeTaskKey, setActiveTaskKey] = useState('')

  // 被选中的人物的title
  const activeTask = useMemo(() => {
    return tasks.find(item => item.taskID === activeTaskKey)
  }, [tasks, activeTaskKey])

  // 关闭抽屉
  const onClose = () => {
    setActiveTaskKey('');
  };

  /*
  * value: 选择的时间
  */
  const handleSelectTime = (value: any) => {
    setDdl(value)
  }

  /*
  * 创建按钮事件
  */
  const handleCreate = () => {
    const taskID = Date.now().toString()
    setTasks([...tasks, {
      title: curTitle,
      desc: '',
      endTime: ddl,
      taskID
    }])
    // 任务创建成功，收起任务创建列表
    setIsCreate(false)
    // 清空输入框内容
    setCurTitle('')
  }

  /* 
  * 快速获取并格式化今天/明天的日期
  */
  const handleQuickCreate = (offset: number) => {
    // 获取当前时间戳
    const nowTimeStamp = new Date()
    // 获得时间字符串
    const stringTime = nowTimeStamp.toLocaleDateString().split('/').join(' ') + ' 18:00:00'
    // 使用moment格式化日期，加上一天，就是明天的日期
    let formatTime = moment(stringTime).add(offset, 'd')   // .format('Y-M-D HH:mm:ss')
    setDdl(formatTime)
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
            style={{ marginLeft: "10px" }}
            // 加上onChange和value属性，使Input变为受控组件
            // 将输入框内容赋值给title
            onChange={event => { setCurTitle(event.target.value) }}
            value={curTitle} />
        </div>
        {
          isCreate && (<div className='time-tags'>
            {/* 
              批量生成Tag标签
            */}
            {
              quickTimeConfig.map((item) => (
                <Tag
                  key={item.offset}
                  color={item.color}
                  onClick={() => handleQuickCreate(item.offset)}>
                  {item.title}
                </Tag>
              ))
            }
            {/* 
              时间选择器，用于设置任务开始时间以及结束时间
            */}
            <DatePicker
              showTime
              onOk={handleSelectTime}
              placeholder="选择任务结束时间"
              value={ddl}
              size='small'
            />
            <div className='operation-btns'>
              <Button
                danger
                size='small'
                // 撤销，将创建列表隐藏
                onClick={() => { setIsCreate(false) }}
                style={{ margin: '5px' }}>
                撤销
              </Button>
              <Button
                type="primary"
                size='small'
                onClick={handleCreate}
                // 若title为空，则不可创建
                disabled={curTitle === ''}>
                创建
              </Button>
            </div>
          </div>
          )
        }
      </div>

      <div className='task-item-container'>
        {
          // 遍历任务列表
          tasks.map((item) => (
            <TaskItem
              key={item.title}
              title={item.title}
              desc=''
              endTime={item.endTime}
              // 若被选中则处于激活状态，弹出抽屉(Drawer)
              active={activeTaskKey === item.taskID}
              onClick={() => setActiveTaskKey(item.taskID)}
            />
          ))
        }
      </div>
      <Drawer
        title={activeTask?.title}
        placement="right"
        onClose={onClose}
        visible={activeTaskKey !== ''}>

        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
