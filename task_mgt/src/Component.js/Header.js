import React from 'react'

import InsertNew from './InsertNew'




function Header({render}) {
  return (
    <header>

<h2>YOUR PERSONAL TASK-MANAGER</h2>

<InsertNew rerender={render} />



</header>
  )
}

export default Header