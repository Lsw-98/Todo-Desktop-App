/**
* 创建好的每一项任务Item
* task item组件
*/

import './index.less'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { TaskType } from '..';
import { TASK_STATUS } from '@/const';
import { Button, Form, Input } from 'antd';
import QuickDateFormat from '../QuickDateFormat';

moment.locale('zh-CN');

// 对props进行类型限制
interface IProps {
  task: TaskType
  active: boolean    // 当前任务是否被选中，默认值为false
  onMore: () => void   // 更多操作按钮点击事件
  onFinish: () => void   // 任务完成按钮点击事件
  onRemove: () => void // 任务删除按钮点击事件
  onSubmit: (values: TaskType) => void
}

export default function TaskItem(props: IProps) {
  const { task, active = false, onFinish, onRemove, onSubmit } = props
  const { startTime, endTime, finishTime, title, status } = task

  // edit：是否处于编辑状态
  const [edit, setEdit] = useState(false)

  // 比较当前时间和任务截止事件，判断是否超时
  const isTimeOut = useMemo(() => {
    return endTime.diff(moment())
  }, [endTime])

  /**
  * 提交表单，更改任务信息
  * values: 表单提交对象
  */
  const handleSubmit = (values: any) => {
    if (task) {
      onSubmit?.({
        taskID: task.taskID || '',
        desc: values.desc || task.desc,
        title: values.title || title,
        endTime: values.endTime || task.endTime,
        finishTime: task.finishTime || '',
        startTime: values.startTime || task.startTime,
        status: task.status
      })
      setEdit(false)
    }
  };

  return (
    // 如果被选中，就增加选中的样式
    <div className={`task-item ${active ? 'task-item-active' : ''}`}>
      <div className='task-item-main'>
        <div className="task-item-info" onClick={() => setEdit(!edit)}>
          <div className={`task-item-title ${isTimeOut < 0 ? 'task-item-timeouttask' : ''}`}>{title}</div>

        </div>
        <div className="task-item-status">
          <button className="task-item-finish btns" onClick={onFinish}>
            {
              status === TASK_STATUS.DOING ? "完成" : "重启任务"
            }
          </button>
          <button className="task-item-del btns" onClick={onRemove}>删除</button>
        </div>
      </div>

      {
        !edit ? (
          <div className='task-item-detail'>
            <div className="task-item-desc">
              <label>开始时间</label>
              <div className="task-item-starttime">{startTime.format('Y-M-D HH:mm:ss')}</div>
            </div>
            <div className="task-item-desc">
              <label>截止时间</label>
              <div className="task-item-endtime">{endTime.format('Y-M-D HH:mm:ss')}</div>
            </div>
            {
              status === TASK_STATUS.DONE && (
                <div className="task-item-desc">
                  <label>完成时间</label>
                  <div className="task-item-finishtime">{moment(finishTime).format('Y-M-D HH:mm:ss')}</div>
                </div>
              )
            }
            {
              isTimeOut < 0 && (
                <div className="task-item-desc">
                  {/* <label>截止状态</label> */}
                  <div className="task-item-timeout tag">{`${endTime.fromNow()}已截止`}</div>
                </div>
              )
            }
          </div>
        ) : (
          <div className='task-item-editor'>
            <Form
              onFinish={handleSubmit}
              initialValues={task}
            >
              <div className='form-item-container'>
                <div className='form-item-icon'>任务名称：</div>
                <div className='form-item-component'>
                  <Form.Item name='title' rules={[{ required: true, message: "任务名称不能为空" }]}>
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className='form-item-container'>
                <div className='form-item-icon'>开始日期：</div>
                <div className='form-item-component'>
                  <Form.Item name="startTime">
                    <QuickDateFormat />
                  </Form.Item>
                </div>
              </div>
              <div className='form-item-container'>
                <div className='form-item-icon'>截止日期：</div>
                <div className='form-item-component'>
                  <Form.Item name="endTime">
                    <QuickDateFormat />
                  </Form.Item>
                </div>
              </div>
              <div className='form-item-container'>
                <div className='form-item-icon'>描述：</div>
                <div className='form-item-component'>
                  <Form.Item name="desc">
                    <Input.TextArea rows={4} placeholder="输入任务描述内容..." />
                  </Form.Item>
                </div>
              </div>

              <Form.Item>
                <button className='btns' type='submit'>提交</button>
              </Form.Item>
            </Form>
          </div>
        )
      }
    </div >
  );
}
