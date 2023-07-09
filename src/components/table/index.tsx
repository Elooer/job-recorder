import './index.less'
import TableItem from './components/table-item'
import type { TableList } from '../../types/common'

interface Props {
  tableList: TableList[]
  updateList: Function
}

const Table = (props: Props) => {
  const { tableList, updateList } = props

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
          return <TableItem dataSource={item} updateList={updateList} key={item.id} />
        }) : <div className="no-record">暂无记录</div>}
      </div>
    </>
  )
}

export default Table
