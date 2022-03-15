// 日历组件

import { useEffect, useRef, useState } from 'react'
import './index.less'
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { TaskType } from '../TaskList';
import moment from 'moment';
import { getApi } from '@/api';
import apiConfig from '@/api/config';
import { API_RESULT, MENU_KEY } from '@/const';
import { Button } from 'antd';

interface IProps {

}

export default function TaskCalendar(props: IProps) {
  const { } = props
  // tasks：创建的任务
  const [tasks, setTasks] = useState<TaskType[]>([])

  const calendarRef = useRef<any>()

  // 当页面第一次渲染时，加载calendar
  useEffect(() => {
    const calendar = new Calendar('#calendar', {
      defaultView: 'month',
      taskView: true,
      useDetailPopup: true,    // 任务详细信息小抽屉
      disableClick: true,
      disableDblClick: true,
    })
    calendarRef.current = calendar
    getLastestList()
    // return () => {
    //   // 若calendar Dom元素已经被渲染了，则将其清空
    //   const dom = document.querySelector('#calendar')
    //   if (dom) {
    //     dom.innerHTML = ''
    //   }
    // }
  }, [])

  useEffect(() => {
    if (calendarRef.current) {
      const schedules = tasks.map(item => ({
        // calendar日历组件需要的一些属性
        id: item.taskID,
        calendarId: item.taskID,
        title: item.title,
        category: 'time',
        dueDateClass: '',
        end: item.endTime.toISOString().split('.')[0] + 'Z',
        start: item.startTime.toISOString().split('.')[0] + 'Z',
        bgColor: '#2261e4',
        color: 'white',
        borderColor: '#204df8',
        isReadOnly: true,
      }))
      calendarRef.current.clear()
      calendarRef.current.createSchedules(schedules);
    }
  }, [tasks])

  const getLastestList = () => {
    getApi(apiConfig.list.url, {
      type: MENU_KEY.DOING
    }).then(res => {
      // 如果请求成功
      if (res.code === API_RESULT.SUCCESS) {
        // 遍历请求结果，存储到新的数组中
        const LastestList = res.data.map((item: TaskType) => {
          // 用moment格式覆盖字符串格式的endTime
          return Object.assign(item, {
            endTime: moment(item.endTime),
            startTime: moment(item.startTime),
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

  const changePage = (flag: -1 | 1 | 0) => {
    if (flag === -1) {
      calendarRef.current.prev()
    } else if (flag === 0) {
      calendarRef.current.today()
    } else {
      calendarRef.current.next()
    }
  }

  return (
    <div className='calendar-container'>
      <div className="calendar-btns">
        <Button onClick={() => changePage(-1)} size="small">上个月</Button>
        <Button onClick={() => changePage(0)} size="small">今天</Button>
        <Button onClick={() => changePage(1)} size="small">下个月</Button>
      </div>
      <div id="calendar"></div>
    </div>
  )
}
