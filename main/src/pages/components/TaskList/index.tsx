/*
* 创建任务组件
*/

import './index.less'
import TaskItem from './TaskItem';
import { message, Radio } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import apiConfig from '@/api/config';
import { getApi, postApi } from '@/api';
import { API_RESULT, MENU_KEY, TASK_STATUS } from '@/const';
import TaskCreator from './TaskCreator';
import { Empty } from 'antd';
import TaskToolBar from './TaskToolBar';
import { getLocal, saveLocal } from '@/utils';

// 导出TaskType类型，给TaskDetail用
export type TaskType = {
  taskID: string  // 任务ID，当前的时间戳
  title: string  // 任务标题
  desc: string  // 任务描述
  startTime: moment.Moment // 开始时间
  endTime: moment.Moment   // 结束时间 
  finishTime: moment.Moment | '' // 完成时间
  status: number   // 任务当前状态
}

interface IProps {
  activeKey: number
  onCountChange: () => void
}

const SORT_LOCAL_KEY = "todo-sort"

export default function TaskList(props: IProps) {
  // 存当前激活的是哪个菜单项，以便展示对应菜单项的内容
  const { activeKey, onCountChange } = props
  // tasks：创建的任务
  const [tasks, setTasks] = useState<TaskType[]>([])
  // activeTask：创建后的任务是否被选中
  const [activeTaskKey, setActiveTaskKey] = useState('')
  // 排序方式，默认为按开始时间排序
  const [sort, setSort] = useState(getLocal(SORT_LOCAL_KEY, 'sort-start'))
  // 过滤任务，在搜索框输入文字后过滤掉不含输入文字的任务
  const [filter, setFilter] = useState('')
  // 任务细化
  const [classiFier, setClassiFier] = useState('0')

  // 任务排序，当sort变化时，重新排序
  const sortTasks = useMemo<TaskType[]>(() => {
    return [...tasks].sort((a: TaskType, b: TaskType) => {
      if (sort === "sort-start") {
        return a.startTime.diff(b.startTime)
      } else if (sort === "sort-end") {
        return a.endTime.diff(b.endTime)
      } else {
        return 0
      }
    })
  }, [tasks, sort])

  // 输入框过滤任务
  const filteredTasks = useMemo<TaskType[]>(() => {
    // 如果filter有值(输入框输入了内容)，则过滤
    if (filter) {
      return sortTasks.filter(item => (
        item.title.includes(filter)
      ))
      // 否则返回原任务列表(输入框为空)
    } else {
      return sortTasks
    }
  }, [sortTasks, filter])

  // 按钮点击细分任务
  const classifierTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const momentToday = moment().toISOString()

    switch (classiFier) {
      case "0":  // 全部任务
        return filteredTasks

      case "1":  // 今日任务
        return filteredTasks.filter((item: TaskType) => (
          item.startTime.isSameOrBefore(momentToday) && item.endTime.isAfter(momentToday)
        ))

      case "2":  // 待开始任务
        return filteredTasks.filter((item: TaskType) => (
          item.startTime.isAfter(momentToday)
        ))

      case "3":  // 已截止任务
        return filteredTasks.filter((item: TaskType) => (
          item.endTime.isBefore(momentToday)
        ))
      case "4":  // 将要截止任务
        return filteredTasks.filter((item: TaskType) => {
          const endTime = item.endTime.toISOString().split('T')[0]
          return moment(endTime).isSame(moment(today)) && item.endTime.isAfter(momentToday)
        })

      default:
        return filteredTasks
    }
  }, [filteredTasks, classiFier])

  // 当菜单项点击发生变化时，更新task列表内容
  useEffect(() => {
    getLastestList()
  }, [activeKey])

  // 当task任务长度发生变化时，更新菜单项的个数
  useEffect(() => {
    onCountChange?.()
  }, [tasks.length])

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
            endTime: moment(item.endTime),
            startTime: moment(item.startTime)
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
  * 关闭抽屉
  */
  const onClose = () => {
    setActiveTaskKey('');
  };

  /*
  * 创建按钮事件
  */
  const handleCreate = (newTask: TaskType) => {
    postApi(apiConfig.create.url, newTask).then(data => {
      // 任务创建后更新任务列表
      getLastestList()
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
      status: activeKey === MENU_KEY.DOING ? TASK_STATUS.DONE : TASK_STATUS.DOING,
      finishTime: activeKey === MENU_KEY.DOING ? moment() : ''
    }))
    getLastestList()
  }

  /*
  * 修改后提交表单事件
  * values：任务信息
  */
  const handleModify = (values: TaskType) => {
    postApi(apiConfig.update.url, {
      ...values,
      type: activeKey,
    }).then(res => {
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
    postApi(apiConfig.remove.url, { taskID, type: activeKey }).then(res => {
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

  // 细化任务
  const taskClassifier = () => {
    const config = [
      {
        key: "0",
        title: "全部任务"
      },
      {
        key: "1",
        title: "今日任务"
      },
      {
        key: "2",
        title: "待开始任务"
      },
      {
        key: "3",
        title: "已截止任务"
      },
      {
        key: "4",
        title: "将要截止任务"
      },
    ]
    return (
      <div>
        <Radio.Group
          defaultValue={classiFier}
          buttonStyle="solid"
          onChange={(event) => {
            setClassiFier(event.target.value)
          }}
          size="small"
        >
          {
            config.map((item) => (
              <Radio.Button value={item.key} key={item.key}>{item.title}</Radio.Button>
            ))
          }
        </Radio.Group>
      </div >
    )
  }

  return (
    <>
      <TaskToolBar
        tasks={sortTasks}
        onClick={(key) => {
          setSort(key)
          saveLocal(SORT_LOCAL_KEY, key)
        }}
        onSearch={(content) => {
          setFilter(content)
        }}
        refineTask={taskClassifier()}
      />
      <div className='task-list'>
        {
          // 默认激活进行中的任务
          activeKey === MENU_KEY.DOING && <TaskCreator onCreate={handleCreate} />
        }
        <div className='task-item-container'>
          {
            // 遍历任务列表
            classifierTasks.map((item) => (
              <TaskItem
                task={item}
                key={item.title}
                // 若被选中则处于激活状态，弹出抽屉(Drawer)
                active={activeTaskKey === item.taskID}
                onMore={() => setActiveTaskKey(item.taskID)}
                onFinish={() => handleFinish(item.taskID)}
                onRemove={() => handleDel(item.taskID)}
                onSubmit={handleModify}
              />
            ))
          }
          {
            !tasks.length &&
            (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                description={
                  <span>
                    暂无任务
                  </span>
                }
              ></Empty>
            )
          }
        </div>
      </div>
    </>
  );
}
