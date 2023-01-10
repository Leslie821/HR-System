import { useState } from 'react'

import './App.css'
import { Apply } from './applydayoff'
import { CreateNewEmployee } from './createNewEmployee'
import { Dayofflist } from './dayoffList'
import { NavbarNested } from './components/sideBar/SideBar2'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarNested />
    </>
  );
}

export default App;
