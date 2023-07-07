import { useState, useEffect } from 'react'
import './index.less'
import TableItem from './components/table-item'
import type { TableList } from '../../types/common'
import initDB from '../../db'
import IndexedDB from '../../utils/indexedDB'

const list: TableList[] = [
  {
    id: 1,
    company: '一号公司',
    process: '未开始',
    state: '流程中',
  },
  {
    id: 2,
    company: '二号公司',
    process: '爱到发fsdfaasdfsafsafsadfsafsafdsfdsfsfsadfasdfsdfsfafsdaaaaaaaaaasaaaaaaaaaaaaaaaaaaaaaaaaaaaaa烧发烧',
    state: '已通过',
  }, {
    id: 3,
    company: '三号公司',
    process: '发放时',
    state: '已结束',
  },
]

const Table = () => {
  const [tableList, setTableList] = useState<TableList[]>(list)
  useEffect(() => {
    initDB()
  }, [])

  useEffect(() => {
    let data: any
    async function getTableList() {
      data = await IndexedDB.cursorGetData(window.db, 'record')
    }
    setTimeout(() => {
      getTableList()
      console.log(data)
    }, 0)
  }, [])

  return (
    <>
      <div className="t-head">
        <div className="id">序号</div>
        <div className="company">公司</div>
        <div className="process">流程</div>
        <div className="state">状态</div>
        <div className="operation">操作</div>
      </div>
      <div className="t-body">
        {tableList.length ? tableList.map(item => {
          return <TableItem dataSource={item} key={item.id} />
        }) : <div className="no-record">暂无记录</div>}
      </div>
    </>
  )
}

export default Table
