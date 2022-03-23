/**
 * 任务统计组件
 */

// @ts-nocheck
import GridLayout from "react-grid-layout";
import './index.less'
import * as echarts from 'echarts'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getChart, getProgress } from './config'
import apiConfig from '@/api/config'
import { getApi } from '@/api'
import { API_RESULT, MENU_KEY } from '@/const'
import { TaskType } from '../TaskList'
import moment from 'moment'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { getLocal, saveLocal } from '@/utils'

interface IProps {
  countResult: Record<string, number>
}

export default function TaskStatistics(props: IProps) {
  // 每个卡片的属性
  const DEFAULT_LAYOUT = [
    { i: "chart", x: 0, y: 0, w: 3, h: 6 },
    { i: "todayTask", x: 1, y: 0, w: 2, h: 3 },
    { i: "todayFinishTask", x: 4, y: 0, w: 2, h: 4 },
    { i: "finishTask", x: 4, y: 0, w: 3, h: 3 },
    { i: "progress", x: 4, y: 0, w: 3, h: 3 },
    { i: "outTimeTask", x: 4, y: 0, w: 3, h: 3 },
  ];

  const LAYOUT_LOCAL_KEY = "todo-layout"

  const { countResult } = props
  // todayFinishT：今天需要完成的任务
  const [todayFinishT, setTodayFinishT] = useState<TaskType[]>([])
  // otherFinishT：今天之后需要完成的任务
  const [otherFinishT, setOtherFinishT] = useState<TaskType[]>([])
  // outTimeT：已截止的任务
  const [outTimeT, setOoutTimeT] = useState<TaskType[]>([])
  // 设置布局记忆
  const [layout, setLayout] = useState<GridLayout.Layout[]>(getLocal(LAYOUT_LOCAL_KEY, DEFAULT_LAYOUT))

  // 今天剩余任务量
  const todayTask = useMemo(() => {
    return otherFinishT.length
  }, [otherFinishT])

  // 今天完成任务量
  const todayFinishTask = useMemo(() => {
    return todayFinishT.length
  }, [todayFinishT])

  // 累计完成任务量
  const finishTask = useMemo(() => {
    return countResult?.done || 0
  }, [countResult])

  // 已截止的任务
  const outTimeTask = useMemo(() => {
    return outTimeT.length
  }, [outTimeT])

  const chartRefs = useRef<Record<string, echarts.EChartsType>>({})

  // 初次渲染完成后加载echarts
  useEffect(() => {
    const ids = ['task-chart', 'task-progress']
    ids.forEach(item => {
      const dom = document.getElementById(item)

      if (dom && chartRefs.current) {

        chartRefs.current[item] = echarts.init(dom)
      }
    })
  }, [])

  // 每当有任务数量发生变化时，重新加载echarts
  useEffect(() => {
    getLastestList(MENU_KEY.DONE)
    getLastestList(MENU_KEY.DOING)
    if (chartRefs.current?.['task-chart']) {
      const chartObj = chartRefs.current['task-chart']
      const dataSource = [
        {
          name: "进行中任务",
          // 得到进行中的任务数量
          value: countResult.doing,
        },
        {
          name: "已完成任务",
          // 得到已完成的任务数量
          value: countResult.done,
        },
      ]
      const option = getChart(dataSource)
      // 传给echarts
      chartObj.setOption(option)
    }

    if (chartRefs.current?.['task-progress'] && todayFinishTask !== undefined && todayTask !== undefined) {
      const chartObj = chartRefs.current['task-progress']
      const percentage = (todayFinishTask / (todayFinishTask + todayTask)) * 100
      const option = getProgress(isNaN(percentage) ? 0 : percentage)
      chartObj.setOption(option)
    }
  }, [countResult])

  // 得到最新的任务列表
  const getLastestList = (count: number) => {
    getApi(apiConfig.list.url, {
      type: count
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

        // 得到今天的日期
        const today = moment().format("YYYY-MM-DD")

        // 得到已截止的任务
        const outTimeTask = LastestList.filter((item: TaskType) => {
          return moment(item.endTime, "YYYY-MM-DD").isBefore(today)
        })
        setOoutTimeT(outTimeTask)

        if (count === 1) {
          // 得到今天完成的任务
          const todayTask = LastestList.filter((item: TaskType) => {
            return moment(item.finishTime, "YYYY-MM-DD").isSame(today)
          })
          setTodayFinishT(todayTask)

        } else {
          // 得到今天和今天之前的任务
          const otherTask = LastestList.filter((item: TaskType) => {
            return moment(item.startTime, "YYYY-MM-DD").isSameOrBefore(today)
          })
          setOtherFinishT(otherTask)
        }
      } else {
        // 请求失败
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const renderCard = () => {
    // 配置卡片
    const cards = [
      {
        theme: "",
        title: "任务完成比",
        key: "chart",
        content: () => (
          <div id='task-chart' className='charts'></div>
        )
      },
      {
        theme: "",
        title: "任务进度",
        key: "progress",
        content: () => (
          <div id='task-progress' className='charts'></div>
        )
      },
      {
        theme: "orange",
        title: "今日剩余任务",
        key: "todayTask",
        content: () => (
          <div className='card-container'>
            {todayTask}
            {/* <Statistic title="今日剩余任务" value= /> */}
          </div>
        )
      },
      {
        theme: "wheat",
        title: "今日已完成任务量",
        key: "todayFinishTask",
        content: () => (
          <div className='card-container'>
            {todayFinishTask}
          </div>
        )
      },
      {
        theme: "puple",
        title: "累计已完成任务量",
        key: "finishTask",
        content: () => (
          <div className='card-container'>
            {finishTask}
          </div>
        )
      },
      {
        theme: "puple",
        title: "已截止的任务",
        key: "outTimeTask",
        content: () => (
          <div className='card-container'>
            {outTimeTask}
          </div>
        )
      },
    ]
    // 遍历卡片加载
    return cards.map(item => (

      <div className={`card card-theme-${item.theme}`} key={item.key} >
        <div className="card-container-title">{item.title}</div>
        {
          item.content()
        }
      </div>
    ))
  }

  const handleLayoutChange = (value: GridLayout.Layout[]) => {
    saveLocal(LAYOUT_LOCAL_KEY, value)
  }

  return (
    <div className='cards'>
      <GridLayout
        className="layout"
        layout={layout}
        cols={15}
        rowHeight={40}
        width={1500}
        onLayoutChange={handleLayoutChange}
      >
        {renderCard()}
      </GridLayout>
    </div>
  )
}
