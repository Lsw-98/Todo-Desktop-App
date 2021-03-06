interface IProps {
  active?: boolean
}

// 加号图标
export const PlusIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
    <path d="M24.0607 10L24.024 38" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 24L38 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>)
}

// 正在进行的任务图标
export const DoingIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V38C42 40.2091 40.2091 42 38 42H10C7.79086 42 6 40.2091 6 38V10Z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    <path d="M6 32H42" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 16L24 20L28 16" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 26V38" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42 26V38" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>)
}

// 已完成的任务图标
export const DoneIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
    <path d="M14 24L15.25 25.25M44 14L24 34L22.75 32.75" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 24L14 34L34 14" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  )
}

// 日历图标
export const CalendarIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (
    < svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <rect x="4" y="8" width="40" height="36" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M28 20V34H36V20H28Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 4V12" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 4V12" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 20H20V34H12" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 27H14" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg >
  )
}

// 列表图标
export const ListIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="40" height="36" rx="3" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 14H44" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 24H36" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 32H36" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 24H14" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 32H14" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// 任务统计图标
export const DataIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4V24H44Z" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M43.0844 18H30V4.91553C36.2202 6.86917 41.1308 11.7798 43.0844 18Z" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 排序图标
export const SortIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path d="M19 6L19 42" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17.8995L19 5.89949" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 42.1005L29 6.10051" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29 42.1005L41 30.1005" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 卡片配置图标
export const CardIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20 24H44H20Z" fill="none" />
      <path d="M20 24H44" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20 38H44H20Z" fill="none" />
      <path d="M20 38H44" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20 10H44H20Z" fill="none" />
      <path d="M20 10H44" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="34" width="8" height="8" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <rect x="4" y="20" width="8" height="8" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      <rect x="4" y="6" width="8" height="8" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

// 设置图标
export const SettingIcon = (props: IProps) => {
  const { active = false } = props
  const color = active ? '#FFF' : getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect width="48" height="48" fill="white" fillOpacity="0.01" strokeLinejoin="round" strokeWidth="4" stroke="none" fillRule="evenodd" />
        <g transform="translate(4.000000, 4.000000)">
          <polygon stroke={color} fill="none" points="20 1.74860126e-15 14 6 6 6 6 14 1.74860126e-15 20 6 26 6 34 14 34 20 40 26 34 34 34 34 26 40 20 34 14 34 6 26 6" strokeLinejoin="round" strokeWidth="4" fillRule="nonzero" />
          <circle stroke={color} fill="none" cx="20" cy="20" r="6" strokeLinejoin="round" strokeWidth="4" fillRule="nonzero" />
        </g>
      </g>
    </svg>
  )
}