/**
 * 顶部菜单栏组件
 */

import { SortIcon } from '@/components/Icon'
import { Dropdown, Menu, Select } from 'antd'
import { useMemo } from 'react'
import { TaskType } from '..'
import './index.less'

const { Option } = Select;

interface IProps {
  tasks: TaskType[]
  onClick: (key: string) => void
  onSearch: (key: string) => void
  // 细化任务
  refineTask?: JSX.Element
}

export default function TaskToolBar(props: IProps) {
  const { onClick, tasks, onSearch, refineTask } = props

  // 设置搜索框选项
  const searchOptions = useMemo(() => {
    return tasks.map(item => ({
      // value是搜索框的值，值就是任务名称
      value: item.title,
      label: item.title,
    }))
  }, [tasks])

  // 搜索框
  const renderSearchTask = () => {
    return (
      <Select
        className='task-search'
        showSearch
        placeholder="搜索任务"
        optionFilterProp="children"
        onChange={onSearch}
        onSearch={onSearch}
        allowClear
        size='small'
      >
        {
          // 渲染选项
          searchOptions.map(item => (
            <Option value={item.value} key={item.value}>{item.label}</Option>
          ))
        }
      </Select>
    )
  }

  // 如果是进行中或者已完成，则显示任务排序按钮
  const renderTools = () => {
    const menu = (
      <Menu onClick={(item) => onClick(item.key)}>
        <Menu.Item key="sort-start">按任务开始时间</Menu.Item>
        <Menu.Item key="sort-end">按任务截止时间</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottom">
        <div className="task-tool-bar-sort">
          <SortIcon active={false} />
        </div>
      </Dropdown>
    )
  }

  return (
    <div className='task-tool-bar'>
      <div className="refine-task">{refineTask}</div>
      <div className='task-tool-bar-content'>
        {/* 渲染搜索框 */}
        {renderSearchTask()}
        {/* 渲染排序按钮 */}
        {renderTools()}
      </div>
    </div >

  )
}
