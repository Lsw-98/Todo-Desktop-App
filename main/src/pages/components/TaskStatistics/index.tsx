/**
 * 任务统计组件
 */

import './index.less'
import * as echarts from 'echarts'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getChart } from './config'
import { Statistic } from 'antd'
import apiConfig from '@/api/config'
import { getApi } from '@/api'
import { API_RESULT, MENU_KEY } from '@/const'
import { TaskType } from '../TaskList'
import moment from 'moment'
import CardContainer from '@/components/CardContainer'

interface IProps {
  countResult: Record<string, number>
}

export default function TaskStatistics(props: IProps) {
  const { countResult } = props
  // tasks：创建的任务
  const [todayFinishT, setTodayFinishT] = useState<TaskType[]>([])

  // 今天剩余任务量
  const todayTask = useMemo(() => {
    return countResult?.doing || 0
  }, [countResult])

  // 今天完成任务量
  const todayFinishTask = useMemo(() => {
    return todayFinishT.length
  }, [todayFinishT])

  // 累计完成任务量
  const finishTask = useMemo(() => {
    return countResult?.done || 0
  }, [countResult])

  const chartRef = useRef<echarts.EChartsType>()

  // 初次渲染完成后加载echarts
  useEffect(() => {
    const dom = document.getElementById('task-chart')
    if (dom) {
      const myChart = echarts.init(dom)
      chartRef.current = myChart
    }
  }, [])

  // 每当有任务数量发生变化时，重新加载echarts
  useEffect(() => {
    if (chartRef.current) {
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
      const options = getChart(dataSource)
      // 传给echarts
      chartRef.current.setOption(options)

      getLastestList()
    }
  }, [countResult])

  // 得到最新的任务列表
  const getLastestList = () => {
    getApi(apiConfig.list.url, {
      type: MENU_KEY.DONE
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

        // 得到今天完成的任务
        const todayTask = LastestList.filter((item: TaskType) => {
          return moment(item.finishTime, "YYYY-MM-DD").isSame(today)
        })
        setTodayFinishT(todayTask)
      } else {
        // 请求失败
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='cards'>
      <CardContainer title='任务统计'>
        <div id='task-chart' className='charts'></div>
      </CardContainer>

      <CardContainer theme='orange' height={140}>
        <div className='card-container'>
          <Statistic title="今日剩余任务" value={todayTask} />
        </div>
      </CardContainer>
      <CardContainer theme='wheat' height={140}>
        <div className='card-container'>
          <Statistic title="今日已完成任务量" value={todayFinishTask} />
        </div>
      </CardContainer>
      <CardContainer theme='puple' height={140}>
        <div className='card-container'>
          <Statistic title="累计完成任务量" value={finishTask} />
        </div>
      </CardContainer>
    </div>
  )
}
