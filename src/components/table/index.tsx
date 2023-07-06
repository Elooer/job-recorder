import React from 'react'
import './index.less'
import TableItem from './components/table-item'
import { State } from './components/table-item'

const list = [
  {
    id: 1,
    company: '一号公司',
    process: '未开始',
    state: State.process,
  },
  {
    id: 2,
    company: '二号公司',
    process: '爱到发fsdfaasdfsafsafsadfsafsafdsfdsfsfsadfasdfsdfsfafsdaaaaaaaaaasaaaaaaaaaaaaaaaaaaaaaaaaaaaaa烧发烧',
    state: State.sucess,
  }, {
    id: 3,
    company: '三号公司',
    process: '发放时',
    state: State.fail,
  },
]


const Table: React.FC = () => {
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
        {list.map(item => {
          return <TableItem dataSource={item} key={item.id} />
        })}
      </div>
    </>
  )
}

export default Table
