import { useState } from 'react'
import './index.less'
import Modal from '../../../modal'

export enum State {
    process = '流程中',
    sucess = '已通过',
    fail = '已结束'
}

interface Props {
    dataSource: {
        id: number
        company: string
        process: string
        state: State
    }
}

const TableItem = (props: Props) => {
    const { dataSource } = props
    const [isOpen, setIsOpen] = useState(false)


    const editMethod = () => {
        setIsOpen(!isOpen)
    }

    const deleteMethod = () => {

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
            <Modal open={isOpen} />
        </>
    )
}

export default TableItem
