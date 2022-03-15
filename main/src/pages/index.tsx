import { MENU_KEY } from '@/const';
import { useState } from 'react';
import MainMenu from './components/MainMenu';
import TaskCalendar from './components/TaskCalendar';
import TaskList from './components/TaskList';
import TaskToolBar from './components/TaskList/TaskToolBar';
import './index.less'

export default function IndexPage() {
  // 菜单栏状态，默认打开的菜单栏为日历
  const [tab, seTtab] = useState(MENU_KEY.CALENDAR)
  const [updateFlag, setUpdateFlag] = useState(0)

  return (
    <div className='page container'>
      <MainMenu activeKey={tab} onChange={seTtab} updateFlag={updateFlag} />
      <div style={{ flex: 1, background: '#fcfcfc' }}>
        <TaskToolBar />
        {
          [MENU_KEY.DOING, MENU_KEY.DONE].includes(tab) && (
            <TaskList activeKey={tab} onCountChange={() => setUpdateFlag((pre) => pre + 1)} />
          )

        }
        {
          tab === MENU_KEY.CALENDAR && <TaskCalendar />
        }
      </div>
    </div>
  );
}
