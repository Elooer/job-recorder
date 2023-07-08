import { useState, useEffect } from 'react'
import Head from './components/head'
import './App.less'
import Table from './components/table'
import initDB from './db'
import { TableList } from './types/common'

function App() {
  const [tableList, setTableList] = useState<TableList[]>([])
  useEffect(() => {
    initDB().then(res => {
      setTableList(res)
    })
  }, [])

  return (
    <>
      <div className="container">
        <Head updateList={() => initDB().then(res => {
          console.log('清空', res)
          setTableList(res)
        })} />
        <Table tableList={tableList} updateList={() => initDB().then(res => {
          setTableList(res)
        })} />
      </div>
    </>
  )
}

export default App
