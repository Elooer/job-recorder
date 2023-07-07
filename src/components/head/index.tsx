import { useState } from 'react'
import './index.less'
import Modal from '../modal'
import IndexedDB from '../../utils/indexedDB'
import { STORENAME } from '../../constant/db'
import { TableList } from '../../types/common'

const Head: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [record, setRecord] = useState({ company: '', process: '', state: '流程中' })

  const addRecord = () => {
    setIsOpen(!isOpen)
  }

  const confirmMethod = async (record: TableList) => {
    console.log('确认');
    console.log(record);

    const data = await IndexedDB.addData(window.db, STORENAME, record)
    console.log(data);

  }

  return (
    <div className="head-container">
      <button onClick={addRecord} className='add'>新增记录</button>
      <Modal open={isOpen} confirmHandler={confirmMethod} >新增</Modal>
    </div>
  )
}

export default Head
