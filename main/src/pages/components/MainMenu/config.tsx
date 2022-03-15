import { CalendarIcon, DoingIcon, DoneIcon } from "@/components/Icon"
import { MENU_KEY } from "@/const"

const config = [
  {
    name: "日历",
    key: MENU_KEY.CALENDAR,
    apiKey: '',
    icon: () => <CalendarIcon />,
  },
  {
    name: "进行中",
    key: MENU_KEY.DOING,
    apiKey: 'doing',
    icon: () => <DoingIcon />,
  },

  {
    name: "已完成",
    key: MENU_KEY.DONE,
    apiKey: 'done',
    icon: () => <DoneIcon />,
  },
]

export default config