import './index.less'

// 对props进行类型限制
interface IProps {
  title: string  // 任务标题
  desc: string  // 任务描述
  // startTime: string   // 开始时间
  endTime: string   // 结束时间
  // status: string    // 当前任务状态
}

export default function TaskItem(props: IProps) {
  const { title, desc, endTime } = props
  return (
    <div className='task-item'>
      <div className='task-item-info'>
        <div className="task-item-title">
          {title}
        </div>
        <div className="task-item-desc">
          {desc}
        </div>
      </div>
      <div className="task-item-status">
        <div className="task-item-endtime">
          {endTime}
        </div>
        <button className="task-item-finish">
          已完成
        </button>
      </div>
    </div >
  );
}
