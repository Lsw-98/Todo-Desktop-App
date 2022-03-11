import { Button, DatePicker, Drawer, Form, Input, Tag } from 'antd'
import './index.less'
import { TaskType } from '..'
import { useMemo, useState } from 'react'
import { quickTimeConfig } from '../config'
import QuickDateFormat from '../QuickDateFormat'

interface IProps {
  task?: TaskType
  onClose: () => void
  onSubmit: (values: TaskType) => void
}

export default function TaskDetail(props: IProps) {
  const { task, onClose, onSubmit } = props
  const [title, setTitle] = useState('')

  const realTitle = useMemo(() => {
    // 若当前title有值，则选用title，若没有则判断task.title的值
    // 优先使用更改后的title
    return title ? title : (task?.title || '')
  }, [title, task])

  /*
  * 将抽屉中的title变为Input输入框，方便更改title
  */
  const renderTitle = () => {
    return (
      <Input
        name='title'
        value={realTitle}
        onChange={handleTitleChange}
      />
    )
  }

  /*
  * title更改事件，用于在title更改后设置新title
  */
  const handleTitleChange = (event: any) => {
    setTitle(event.target.value)
  }

  /*
  * 提交表单，更改任务信息
  * values: 表单值，为一个对象
  */
  const handleSubmit = (values: any) => {
    onSubmit?.({
      taskID: task?.taskID || '',
      desc: values.desc || task?.desc,
      title: realTitle,
      endTime: values.endTime || task?.endTime
    })
    onClose()
    
  };

  return (
    <Drawer
      className='task-detail'
      title={renderTitle()}
      placement="right"
      onClose={() => {
        onClose()
        // 清空title，否则会影响下一次创建
        setTitle("")
      }}
      visible={task !== undefined}
      closable={false}
    >
      <Form
        onFinish={handleSubmit}
        initialValues={task}
      >
        <div className='form-item-container'>
          <div className='form-item-icon'>日期：</div>
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
          <Button
            className='submit-btn'
            type='primary'
            htmlType='submit'
            disabled={realTitle === ''}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}