/**
 * 设置组件
 */

import { Form, Input } from 'antd'
import './index.less'

interface IProps {
  settings: Record<string, string>
  onSubmit: (newSettings: Record<string, string>) => void
}

export default function Setting(props: IProps) {
  const { settings, onSubmit } = props


  const onFinish = (values: any) => {
    onSubmit(values)
  };

  return (
    <div className='settings-container'>
      <Form
        name="basic"
        initialValues={settings}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          required
          label="圆角"
          name="radius"
          rules={[{ required: true, message: '圆角尺寸不可为空' }]}
        >
          <Input placeholder="输入圆角尺寸" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          required
          label="主题色"
          name="mainColor"
          rules={[{ required: true, message: '主题色不可为空' }]}
        >
          <Input placeholder='输入十六进制颜色' type="color" />
        </Form.Item>
        <Form.Item>
          <button className='settings-btns' type='submit' style={{ width: "100%" }}>保存</button>
        </Form.Item>
      </Form>
    </div>
  )
}
