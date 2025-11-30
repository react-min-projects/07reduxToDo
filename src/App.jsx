import { useState } from 'react'
import AddTodo from './components/AddTodo'
import { Container } from './components/Container'


function App(){
  return(
    <>
      <div>
        <AddTodo />
        <Container />
      </div>
    </>
  )
}

export default App
