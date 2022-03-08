import './index.less'
import TaskItem from './TaskItem';

export default function TaskList() {
  return (
    <div className='task-list'>
      <div>
        <h1 className="title">任务列表</h1>
      </div>
      <div className='task-item-container'>
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
        <TaskItem title='测试' desc='测试描述' endTime='2022-03-08' />
      </div>
    </div>
  );
}
