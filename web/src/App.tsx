import { useState } from 'react'

import './App.css'
import { Apply } from './applydayoff'
import { CreateNewEmployee } from './createNewEmployee'
import { Dayofflist } from './dayoffList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <CreateNewEmployee /> */}
      <div><Apply /></div>
      <div><Dayofflist /></div>
      <div><CreateNewEmployee /></div>

    </div>
  )
}

export default App
