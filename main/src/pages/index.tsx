import { api } from '@/api';
import apiConfig from '@/api/config';
import { MENU_KEY } from '@/const';
import { useEffect, useState } from 'react';
import MainMenu from './components/MainMenu';
import TaskCalendar from './components/TaskCalendar';
import TaskList from './components/TaskList';
import TaskToolBar from './components/TaskToolBar';
import TaskStatistics from './components/TaskStatistics';
import './index.less'
import { getLocal, saveLocal } from '@/utils';

export default function IndexPage() {
  const SORT_LOCAL_KEY = "todo-sort"
  // 菜单栏状态，默认打开的菜单栏为日历
  const [tab, seTtab] = useState(MENU_KEY.CALENDAR)
  // 菜单栏任务数量是否更新
  const [updateFlag, setUpdateFlag] = useState(0)
  // 进行中的任务数量和已完成的任务数量
  const [countResult, setCountResult] = useState<Record<string, number>>({
    'doing': 0,
    'done': 0,
  })
  // 排序方式，默认为按开始时间排序
  const [sort, setSort] = useState(getLocal(SORT_LOCAL_KEY, 'sort-start'))

  // 每次任务状态更新时同步更新任务数量
  useEffect(() => {
    getCount()
  }, [updateFlag])

  // 获得进行中和已完成任务的数量
  const getCount = () => {
    api(apiConfig.count.url).then(res => {
      setCountResult(res.data)
    })
  }

  // 按何种方式排序
  const handleToolMethod = (key: string) => {
    if ([MENU_KEY.DOING, MENU_KEY.DONE].includes(tab)) {
      if (key.includes('sort')) {
        setSort(key)
        saveLocal(SORT_LOCAL_KEY, key)
      }
    }
  }

  return (
    <div className='page container'>
      <MainMenu activeKey={tab} onChange={seTtab} countResult={countResult} />
      <div style={{ flex: 1, background: 'rgb(234, 234, 234)', padding: "0 50px" }}>
        <TaskToolBar
          tab={tab}
          onClick={handleToolMethod}
        />
        {
          [MENU_KEY.DOING, MENU_KEY.DONE].includes(tab) && (
            <TaskList
              activeKey={tab}
              onCountChange={() => setUpdateFlag((pre) => pre + 1)}
              sort={sort}
            />
          )
        }
        {
          tab === MENU_KEY.CALENDAR && <TaskCalendar />
        }
        {
          tab === MENU_KEY.STATISTICS && <TaskStatistics countResult={countResult} />
        }
      </div>
    </div>
  );
}
