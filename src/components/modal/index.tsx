import { useState, useEffect } from 'react'
import './index.less'

interface Props {
  open: any
}

const Modal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  useEffect(() => {
    setIsOpen(props.open)
  }, [props])
  return <>
    {isOpen && <div id="modal"></div>}
  </>
}

export default Modal