// echarts配置文件
export const getChart = (data: { name: string, value: number }[]) => {
  const options = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '1%',
      left: 'right'
    },
    series: [
      {
        name: '任务完成比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '10',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  }
  return options
}