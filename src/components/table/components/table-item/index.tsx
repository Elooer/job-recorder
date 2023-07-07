import { useState } from 'react'
import './index.less'
import Modal from '../../../modal'
import type { TableList } from '../../../../types/common'

interface Props {
    dataSource: TableList
}

const TableItem = (props: Props) => {
    const { dataSource } = props
    const [isOpen, setIsOpen] = useState(false)


    const editMethod = () => {
        setIsOpen(!isOpen)
    }

    const deleteMethod = () => {

    }

    const confirmMethod = () => {
        console.log('确认');
        console.log(dataSource)
    }
    return (
        <>
            <div className='item-box'>
                <div className="id">{dataSource.id}</div>
                <div className="company">{dataSource.company}</div>
                <div className="process">{dataSource.process}</div>
                <div className="state">{dataSource.state}</div>
                <div className="operation">
                    <button className='edit' onClick={editMethod}>编辑</button>
                    <button className='delete' onClick={deleteMethod}>删除</button>
                </div>
            </div>
            <Modal open={isOpen} confirmHandler={confirmMethod} dataSource={dataSource}>编辑</Modal>
        </>
    )
}

export default TableItem
