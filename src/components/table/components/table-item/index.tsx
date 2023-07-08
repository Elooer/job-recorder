import { useState } from 'react'
import './index.less'
import Modal from '../../../modal'
import Tag from '../tag'
import type { TableList } from '../../../../types/common'
import IndexedDB from '../../../../utils/indexedDB'
import { STORENAME } from '../../../../constant/db'

interface Props {
    dataSource: TableList
    updateList: Function
}

const TableItem = (props: Props) => {
    const { dataSource, updateList } = props
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)


    const editMethod = () => {
        setEditOpen(true)
    }

    const deleteMethod = () => {
        setDeleteOpen(true)
    }

    const editConfirmMethod = async (record: TableList) => {
        console.log(record)
        const data = await IndexedDB.updateDB(window.db, STORENAME, record)
        updateList()
        setEditOpen(false)
    }

    const deleteConfirmMethod = async (record: TableList) => {
        console.log(record)
        const data = await IndexedDB.deleteDB(window.db, STORENAME, record.id)
        updateList()
        setDeleteOpen(false)
    }

    const cancelMethod = () => {
        setEditOpen(false)
        setDeleteOpen(false)
    }
    return (
        <>
            <div className='item-box'>
                <div className="id">{dataSource.id}</div>
                <div className="company">{dataSource.company}</div>
                <div className="process">{dataSource.process}</div>
                <div className="state"><Tag type={dataSource.state}>{dataSource.state}</Tag></div>
                <div className="operation">
                    <button className='edit' onClick={editMethod}>编辑</button>
                    <button className='delete' onClick={deleteMethod}>删除</button>
                </div>
            </div>
            <Modal open={editOpen} confirmHandler={editConfirmMethod} cancelHandler={cancelMethod} dataSource={dataSource} >编辑</Modal>
            <Modal open={deleteOpen} confirmHandler={deleteConfirmMethod} dataSource={dataSource} cancelHandler={cancelMethod}>删除</Modal>
        </>
    )
}

export default TableItem
