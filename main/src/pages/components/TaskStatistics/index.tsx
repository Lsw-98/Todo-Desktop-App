/**
 * 任务统计组件
 */

import './index.less'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { getChart } from './config'

interface IProps {
  countResult: Record<string, number>
}

export default function TaskStatistics(props: IProps) {
  const { countResult } = props

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
    }
  }, [countResult])

  return (
    <div id='task-chart' className='charts'>index</div>
  )
}
