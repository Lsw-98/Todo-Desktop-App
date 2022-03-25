import { api } from '@/api';
import apiConfig from '@/api/config';
import { MENU_KEY } from '@/const';
import { getLocal, saveLocal } from '@/utils';
import { useEffect, useState } from 'react';
import MainMenu from './components/MainMenu';
import Setting from './components/Setting';
import TaskCalendar from './components/TaskCalendar';
import TaskList from './components/TaskList';
import TaskStatistics from './components/TaskStatistics';
import './index.less'

export default function IndexPage() {
  // 菜单栏状态，默认打开的菜单栏为日历
  const [tab, seTtab] = useState(MENU_KEY.CALENDAR)
  // 菜单栏任务数量是否更新
  const [updateFlag, setUpdateFlag] = useState(0)
  // 进行中的任务数量和已完成的任务数量
  const [countResult, setCountResult] = useState<Record<string, number>>({
    'doing': 0,
    'done': 0,
  })

  const SETTINGS_LOCAL_KEY = "todo-settings"
  const DEFAULT_SETTINGS = {
    mainColor: '#2261e4',
    radius: '6px',
  }

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

  const [settings, setSettings] = useState(getLocal(SETTINGS_LOCAL_KEY, DEFAULT_SETTINGS))

  useEffect(() => {
    Object.entries(settings).forEach(item => {
      const [key, value] = item
      document.documentElement.style.setProperty(`--${key}`, String(value))
    })
    saveLocal(SETTINGS_LOCAL_KEY, settings)
  }, [settings])

  return (
    <div className='page container'>
      <MainMenu activeKey={tab} onChange={seTtab} countResult={countResult} />
      <div style={{ flex: 1, background: 'rgb(234, 234, 234)', padding: "0 50px" }}>

        {
          [MENU_KEY.DOING, MENU_KEY.DONE].includes(tab) && (
            <TaskList
              activeKey={tab}
              onCountChange={() => setUpdateFlag((pre) => pre + 1)}
            />
          )
        }
        {
          tab === MENU_KEY.CALENDAR && <TaskCalendar />
        }
        {
          tab === MENU_KEY.STATISTICS && <TaskStatistics countResult={countResult} />
        }
        {
          tab === MENU_KEY.SETTING &&
          <Setting
            settings={settings}
            onSubmit={(newSettings) => {
              setSettings(newSettings)
              setUpdateFlag((pre) => pre + 1)
            }}
          />
        }
      </div>
    </div>
  );
}
