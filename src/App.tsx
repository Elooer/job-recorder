import { useState } from 'react'
import Head from './components/head'
import './App.less'
import Table from './components/table'

function App() {
  return (
    <>
      <div className="container">
        <Head />
        <Table />
      </div>
    </>
  )
}

export default App
