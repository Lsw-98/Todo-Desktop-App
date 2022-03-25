import { CalendarIcon, DataIcon, DoingIcon, DoneIcon, SettingIcon } from "@/components/Icon"
import { MENU_KEY } from "@/const"

const config = [
  {
    name: "日历",
    key: MENU_KEY.CALENDAR,
    apiKey: '',
    icon: (active: boolean) => <CalendarIcon active={active} />,
  },
  {
    name: "进行中",
    key: MENU_KEY.DOING,
    apiKey: 'doing',
    icon: (active: boolean) => <DoingIcon active={active} />,
  },

  {
    name: "已完成",
    key: MENU_KEY.DONE,
    apiKey: 'done',
    icon: (active: boolean) => <DoneIcon active={active} />,
  },
  {
    name: "任务统计",
    key: MENU_KEY.STATISTICS,
    apiKey: '',
    icon: (active: boolean) => <DataIcon active={active} />,
  },
  {
    name: "设置",
    key: MENU_KEY.SETTING,
    apiKey: '',
    icon: (active: boolean) => <SettingIcon active={active} />,
  },
]

export default config