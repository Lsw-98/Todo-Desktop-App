import { MENU_KEY } from '@/const';
import { useState } from 'react';
import MainMenu from './components/MainMenu';
import TaskList from './components/TaskList';
import './index.less'

export default function IndexPage() {
  // 菜单栏状态，默认打开的菜单栏为进行中的任务
  const [tab, seTtab] = useState(MENU_KEY.DOING)
  return (
    <div className='page container'>
      <MainMenu activeKey={tab} onChange={seTtab} />
      <TaskList activeKey={tab} />
    </div>
  );
}
