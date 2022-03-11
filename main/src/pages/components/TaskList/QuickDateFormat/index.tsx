import { DatePicker, Tag } from 'antd'
import moment from 'moment'
import { quickTimeConfig } from '../config'
import './index.less'

interface IProps {
  value?: moment.Moment
  onChange?: (v: moment.Moment) => void
}

export default function QuickDateFormat(props: IProps) {
  const { value, onChange } = props

  /* 
  * 快速获取并格式化今天/明天的日期
  * offset：天数
  */
  const handleQuickCreate = (offset: number) => {
    // 获取当前时间戳
    const nowTimeStamp = new Date()
    // 获得时间字符串
    const stringTime = nowTimeStamp.toLocaleDateString().split('/').join(' ') + ' 18:00:00'
    // 使用moment格式化日期，加上一天，就是明天的日期
    let formatTime = moment(stringTime).add(offset, 'd')   // .format('Y-M-D HH:mm:ss')
    onChange?.(formatTime)
  }

  return (
    <div className='time-tags'>
      {/* 
        批量生成Tag标签
      */}
      {
        quickTimeConfig.map((item) => (
          <Tag
            key={item.offset}
            color={item.color}
            onClick={() => handleQuickCreate(item.offset)}
          >
            {item.title}
          </Tag>
        ))
      }
      {/* 
        时间选择器，用于设置任务开始时间以及结束时间
      */}
      <DatePicker
        showTime
        onOk={onChange}
        placeholder="选择任务结束时间"
        value={value}
        size='small'
      />
    </div>
  )
}
