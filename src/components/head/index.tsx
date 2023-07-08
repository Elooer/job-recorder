import { useState } from 'react'
import './index.less'
import Modal from '../modal'
import IndexedDB from '../../utils/indexedDB'
import { DBNAME, STORENAME } from '../../constant/db'
import { TableList } from '../../types/common'
import indexedDB from '../../utils/indexedDB'

interface Props {
  updateList: Function
}

const Head = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { updateList } = props

  const addRecord = () => {
    setIsOpen(!isOpen)
  }

  const confirmMethod = async (record: TableList) => {
    console.log('确认');
    console.log(record);

    const data = await IndexedDB.addData(window.db, STORENAME, record)
    updateList()
    setIsOpen(false)
  }

  const clearRecord = async () => {
    let isConfirm = confirm('确定清空所有记录吗？')
    if (isConfirm) {
      let res = await indexedDB.deleteDBAll(DBNAME)
      console.log(res)
      updateList()
    }
  }

  const cancelMethod = () => {
    setIsOpen(false)
  }

  return (
    <div className="head-container">
      <button onClick={addRecord} className='btn'>新增记录</button>
      <button onClick={clearRecord} className='btn'>清空记录</button>
      <Modal open={isOpen} confirmHandler={confirmMethod} cancelHandler={cancelMethod} >新增</Modal>
    </div>
  )
}

export default Head
