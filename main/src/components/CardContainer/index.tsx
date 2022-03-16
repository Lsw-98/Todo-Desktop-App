import './index.less'

interface IProps {
  width?: number
  height?: number
  title?: string
  theme?: 'default' | 'orange' | 'wheat' | 'puple'
  children: JSX.Element
}

export default function CardContainer(props: IProps) {
  const { width = 300, height = 300, title, theme = 'default', children } = props
  return (
    <div className={`card card-theme-${theme}`} style={{ width: width + "px", height: height + "px" }}>
      <div className="card-title">{title}</div>
      {
        children
      }
    </div>
  )
}