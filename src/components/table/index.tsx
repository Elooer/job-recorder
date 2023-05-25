import React from 'react'
import './index.less'

const list = [
  {
    time: '2.11',
    title: '投递',
  },
  {
    time: '2.11',
    title: '投递',
  },
  {
    time: '2.11',
    title: '投递',
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
      </div>
    </>
  )
}

export default Table
