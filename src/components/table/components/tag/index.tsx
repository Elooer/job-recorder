import { useEffect, useRef } from 'react'
import './index.less'

interface Props {
  children: React.ReactNode
  type: string
}

const stateColor: any = {
  '已通过': '#39a939',
  '流程中': '#3388e6',
  '已结束': '#777',
}

const Tag = (props: Props) => {
  const { children, type } = props
  const tagRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    tagRef.current!.style.backgroundColor = stateColor[type]
  }, [props])
  return <div className="tag" ref={tagRef}>
    {children}
  </div>
}

export default Tag