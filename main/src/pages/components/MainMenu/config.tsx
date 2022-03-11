import { DoingIcon, DoneIcon } from "@/components/Icon"

const config = [
  {
    name: "进行中",
    key: "doing",
    count: 1,
    icon: () => <DoingIcon />,
  },

  {
    name: "已完成",
    key: "done",
    count: 10,
    icon: () => <DoneIcon />,
  },
]

export default config