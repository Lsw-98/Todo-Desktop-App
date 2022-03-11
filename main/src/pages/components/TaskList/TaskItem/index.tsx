import './index.less'
import moment from 'moment'

// 对props进行类型限制
interface IProps {
  title: string  // 任务标题
  desc: string  // 任务描述
  // startTime: string   // 开始时间
  endTime: moment.Moment   // 结束时间
  // status: string    // 当前任务状态
  active: boolean    // 当前任务是否被选中
  onMore: () => void   // 更多操作按钮点击事件
  onFinish: () => void   // 任务完成按钮点击事件
}

export default function TaskItem(props: IProps) {
  const { title, desc, endTime, active = false, onMore, onFinish } = props
  return (
    <div className={`task-item ${active ? 'task-item-active' : ''}`}>
      <div className='task-item-info' onClick={onMore}>
        <div className="task-item-title">
          {title}
        </div>
        <div className="task-item-endtime">
          {endTime.format('Y-M-D HH:mm:ss')}
        </div>
        <div className="task-item-desc">
          {desc}
        </div>
      </div>
      <div className="task-item-status">
        <button className="task-item-finish" onClick={onFinish}>
          已完成
        </button>
        <button className="task-item-del">
          删除
        </button>
      </div>
    </div >
  );
}
