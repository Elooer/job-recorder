import React, { useState, useEffect } from 'react'
import './index.less'
import { TableList } from '../../types/common'

interface Props {
  open: boolean
  children: React.ReactNode
  confirmHandler: Function
  cancelHandler: Function
  dataSource?: TableList
}

const stateOptions = ['流程中', '已通过', '已结束']

const Modal = (props: Props) => {
  const { open, cancelHandler, confirmHandler, dataSource, children } = props
  const [isOpen, setIsOpen] = useState(true)
  const [record, setRecord] = useState({ company: '', process: '', state: '流程中' })

  useEffect(() => {
    setIsOpen(open)
    dataSource && setRecord(dataSource)
  }, [props])

  const cancelMethod = () => {
    cancelHandler()
  }

  const confirmMethod = () => {
    confirmHandler(record)
  }

  return <>
    {isOpen && <div id="modal">
      <div className="title">{children}</div>
      <div className="input-box">
        <div>
          <label htmlFor="">公司名称：</label><input type="text" value={record.company} onChange={(e) => { setRecord({ ...record, company: e.target.value }) }} />
        </div>
        <div>
          <label htmlFor="">流程进度：</label><input type="text" value={record.process} onChange={(e) => { setRecord({ ...record, process: e.target.value }) }} />
        </div>
        <div>
          <label htmlFor="">当前状态：</label>
          <select className="select" onChange={(e) => { setRecord({ ...record, state: e.target.value }) }} value={record.state}>
            {stateOptions.map(item => { return <option key={item}>{item}</option> })}
          </select>
        </div>
      </div>
      <div className="btn-box">
        <button className="btn cancel" onClick={cancelMethod}>取消</button>
        <button className="btn confirm" onClick={confirmMethod}>确定</button>
      </div>
    </div>
    }

  </>
}

export default Modal