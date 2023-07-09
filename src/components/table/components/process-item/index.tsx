import { useEffect, useRef } from 'react'
import './index.less'

interface Props {
  children: React.ReactNode
}

const ProcessItem = (props: Props) => {
  const { children } = props
  const processRef = useRef<HTMLDivElement>(null)
  useEffect(() => {

  }, [props])
  return <div className="process-item" ref={processRef}>
    {children}
  </div>
}

export default ProcessItem