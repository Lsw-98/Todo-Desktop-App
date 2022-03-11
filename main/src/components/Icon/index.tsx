// 在IconPark中引入一个加号图标

// 加号图标
export const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
    <path d="M24.0607 10L24.024 38" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 24L38 24" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// 正在进行的任务图标
export const DoingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V38C42 40.2091 40.2091 42 38 42H10C7.79086 42 6 40.2091 6 38V10Z" fill="none" stroke="#4a90e2" strokeWidth="4" strokeLinejoin="round" />
    <path d="M6 32H42" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 16L24 20L28 16" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 26V38" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42 26V38" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// 已完成的任务图标
export const DoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
    <path d="M14 24L15.25 25.25M44 14L24 34L22.75 32.75" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 24L14 34L34 14" stroke="#4a90e2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)