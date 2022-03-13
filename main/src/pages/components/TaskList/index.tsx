/*
* 创建任务组件
*/

import './index.less'
import TaskItem from './TaskItem';
import { Input, Button, message } from 'antd'
import { PlusIcon } from '@/components/Icon';
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import TaskDetail from './TaskDetail';
import QuickDateFormat from './QuickDateFormat';
import apiConfig from '@/api/config';
import { api, getApi, postApi } from '@/api';
import { API_RESULT, TASK_STATUS } from '@/const';

// 导出TaskType类型，给TaskDetail用
export type TaskType = {
  taskID: string  // 任务ID，当前的时间戳
  title: string  // 任务标题
  desc: string  // 任务描述
  startTime: moment.Moment // 开始时间
  endTime: moment.Moment   // 结束时间 
  status: 0 | 1   // 任务当前状态
}

interface IProps {
  activeKey: number
}

export default function TaskList(props: IProps) {
  // 存当前激活的是哪个菜单项，以便展示对应菜单项的内容
  const { activeKey } = props
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

  useEffect(() => {
    getLastestList()
  }, [activeKey])

  // 得到最新的任务列表
  const getLastestList = () => {
    getApi(apiConfig.list.url, {
      type: activeKey
    }).then(res => {
      // 如果请求成功
      if (res.code === API_RESULT.SUCCESS) {
        // 遍历请求结果，存储到新的数组中
        const LastestList = res.data.map((item: TaskType) => {
          // 用moment格式覆盖字符串格式的endTime
          return Object.assign(item, {
            endTime: moment(item.endTime)
          })
        })
        setTasks(LastestList)
      } else {
        // 请求失败
      }
    }).catch(err => {
      console.log(err);
    })
  }


  /*
  * 被选中的任务
  */
  const activeTask = useMemo(() => {
    return tasks.find(item => item.taskID === activeTaskKey)
  }, [tasks, activeTaskKey])

  /*
  * 关闭抽屉
  */
  const onClose = () => {
    setActiveTaskKey('');
  };

  /*
  * 创建按钮事件
  */
  const handleCreate = () => {
    const taskID = Date.now().toString()
    const newTask = {
      title: curTitle,
      desc: '',
      startTime: moment(),
      endTime: ddl,
      taskID,
      status: TASK_STATUS.DOING,
    }

    postApi(apiConfig.create.url, newTask).then(data => {
      // 任务创建后更新任务列表
      getLastestList()
      // 任务创建成功，收起任务创建列表
      setIsCreate(false)
      // 清空输入框内容
      setCurTitle('')
      message.success("创建成功！")
    }).catch(err => {
      console.log(err);
    })
  }

  /*
  * 点击完成按钮触发的事件
  * taskID：完成的任务的id
  */
  const handleFinish = (taskID: string) => {
    const finishTask = tasks.find(item => item.taskID === taskID)
    handleModify(Object.assign({}, finishTask, {
      status: TASK_STATUS.DONE
    }))
    getLastestList()
  }

  /*
  * 修改后提交表单事件
  * values：任务信息
  */
  const handleModify = (values: TaskType) => {
    postApi(apiConfig.update.url, values).then(res => {
      if (res.code === API_RESULT.SUCCESS) {
        message.success("修改成功！")
        // 拿到修改后最新的列表
        getLastestList()
      } else {
        message.error(res.msg);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  /*
  * 删除任务事件
  * taskID：完成的任务的id
  */
  const handleDel = (taskID: string) => {
    // 将删除的任务过滤掉
    postApi(apiConfig.remove.url, { taskID }).then(res => {
      if (res.code === API_RESULT.SUCCESS) {
        message.success("删除成功！")
        // 拿到删除后最新的列表
        getLastestList()
      } else {
        message.error(res.msg);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='task-list'>
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

      <div className='task-item-container'>
        {
          // 遍历任务列表
          tasks.map((item) => (
            <TaskItem
              key={item.title}
              title={item.title}
              endTime={item.endTime}
              // 若被选中则处于激活状态，弹出抽屉(Drawer)
              active={activeTaskKey === item.taskID}
              onMore={() => setActiveTaskKey(item.taskID)}
              onFinish={() => handleFinish(item.taskID)}
              onRemove={() => handleDel(item.taskID)}
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
