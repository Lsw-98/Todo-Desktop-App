import './index.less'
import TaskItem from './TaskItem';
import { DatePicker, Input, Tag, Button, Drawer, message } from 'antd'
import { PlusIcon } from '@/components/Icon';
import { useMemo, useState } from 'react'
import moment from 'moment'
import { quickTimeConfig } from './config';
import TaskDetail from './TaskDetail';
import QuickDateFormat from './QuickDateFormat';

// 导出TaskType类型，给TaskDetail用
export type TaskType = {
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

  // 被选中的任务
  const activeTask = useMemo(() => {
    return tasks.find(item => item.taskID === activeTaskKey)
  }, [tasks, activeTaskKey])

  // 关闭抽屉
  const onClose = () => {
    setActiveTaskKey('');
  };

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
    message.success("创建成功！")
  }

  /*
  * 点击完成按钮触发的事件
  * taskID：完成的任务的id
  */
  const handleFinish = (taskID: string) => {
    // 将已完成的任务过滤掉
    setTasks([...tasks.filter(item => item.taskID !== taskID)])
  }

  /*
  * 修改后提交表单事件
  * taskID：完成的任务的id
  */
  const handleModify = (values: TaskType) => {
    setTasks([...tasks.filter(item => item.taskID !== activeTaskKey), values])
    message.success("修改成功！")
  }

  return (
    <div className='task-list'>
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
                  onClick={() => { setIsCreate(false) }}
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
              onMore={() => setActiveTaskKey(item.taskID)}
              onFinish={() => handleFinish(item.taskID)}
            />
          ))
        }
      </div>
      <TaskDetail
        task={activeTask}
        onClose={onClose}
        onSubmit={handleModify}
      />
    </div>
  );
}
