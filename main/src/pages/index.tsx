import MainMenu from './components/MainMenu';
import TaskList from './components/TaskList';
import './index.less'

export default function IndexPage() {
  return (
    <div className='page container'>
      <MainMenu />
      <TaskList />
    </div>
  );
}
