
import './App.css';
import React, { useEffect, useState } from 'react'

import Task from './Component.js/Task';
import Header from './Component.js/Header';



function App() {
  const [tasks, settasks] = useState([]);



  let get_data = () => {
    fetch('http://localhost:8000/', {
      method: 'get'
    })
      .then((data) => data.json())
      .then(data => settasks(data))

  }

  useEffect(() => {
    let nowdate = new Date();
    console.log(nowdate)
    get_data()
  }, [])
  const rerenderer = () => {
get_data()  };


  return (
    <>
      <Header render={rerenderer} />

      <div className='container'>

        {
          tasks.map((value) => (
            <Task tasks={value} onDelete={rerenderer} onUpdate={rerenderer}/>
          ))
        }



      </div>

    </>

  );
}

export default App;
