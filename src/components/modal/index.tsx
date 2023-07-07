import React, { useState, useEffect } from 'react'
import './index.less'
import { TableList } from '../../types/common'

interface Props {
  open: boolean
  children: React.ReactNode
  confirmHandler: Function
  dataSource?: TableList
}

const stateOptions = ['流程中', '已通过', '已结束']

const Modal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [record, setRecord] = useState({ company: '', process: '', state: '流程中' })

  useEffect(() => {
    setIsOpen(!isOpen)
    props.dataSource && setRecord(props.dataSource)
  }, [props])

  const cancelMethod = () => {
    setIsOpen(!isOpen)
  }

  const confirmMethod = () => {
    props.confirmHandler(record)
    setIsOpen(!isOpen)
  }

  return <>
    {isOpen && <div id="modal">
      <div className="title">{props.children}</div>
      <div className="input-box">
        <div>
          <label htmlFor="">公司名称：</label><input type="text" value={record.company} onChange={(e) => { setRecord({ ...record, company: e.target.value }) }} />
        </div>
        <div>
          <label htmlFor="">流程进度：</label><input type="text" value={record.process} onChange={(e) => { setRecord({ ...record, process: e.target.value }) }} />
        </div>
        <div>
          <label htmlFor="">当前状态：</label>
          <select className="select" onChange={(e) => { setRecord({ ...record, state: e.target.value }) }}>
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