/*
* 创建好的每一项任务Item
* task item组件
*/

import './index.less'
import moment from 'moment'
import { useMemo } from 'react'
import { TaskType } from '..';
import { TASK_STATUS } from '@/const';

moment.locale('zh-CN');

// 对props进行类型限制
interface IProps {
  task: TaskType
  active: boolean    // 当前任务是否被选中，默认值为false
  onMore: () => void   // 更多操作按钮点击事件
  onFinish: () => void   // 任务完成按钮点击事件
  onRemove: () => void // 任务删除按钮点击事件
}

export default function TaskItem(props: IProps) {
  const { task, active = false, onMore, onFinish, onRemove } = props
  const { endTime, title, status } = task

  // 比较当前时间和任务截止事件，判断是否超时
  const isTimeOut = useMemo(() => {
    return endTime.diff(moment())
  }, [endTime])
  // 
  return (
    // 如果被选中，就增加选中的样式
    <div className={`task-item ${active ? 'task-item-active' : ''}`}>
      <div className="task-item-info" onClick={onMore}>
        <div className={`task-item-title ${isTimeOut < 0 ? 'task-item-timeouttask' : ''}`}>{title}</div>
        <div className="task-item-date">
          <div className="task-item-endtime">{endTime.format('Y-M-D HH:mm:ss')}</div>
          {
            isTimeOut < 0 && <div className="task-item-timeout">{`${endTime.fromNow()}已截止`}</div>
          }
        </div>
      </div>
      <div className="task-item-status">
        <button className="task-item-finish" onClick={onFinish}>
          {
            status === TASK_STATUS.DOING ? "完成" : "重启任务"
          }
        </button>
        <button className="task-item-del" onClick={onRemove}>删除</button>
      </div>
    </div >
  );
}
