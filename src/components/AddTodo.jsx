import React, {useState} from "react";
import { useDispatch } from 'react-redux'
import { addTodo } from "../features/TodoSlice";


const AddTodo = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const handleAddTodo = (e)=>{
    e.preventDefault();

    if(input.length === 0){
      alert("To Do can't be empty")
      return
    }

    dispatch(addTodo(input))

    setInput("");
  }

  return (
    <>
      <div className='relative text-center font-mono py-10 space-y-8'>
        <div>
          <h2 className='text-5xl font-bold text-white ' >
            To Do List
          </h2>
        </div> 
        <div>
          <form onSubmit={handleAddTodo} >

            <input type="text" placeholder='Enter a Todo..' className='text-white bg-gray-800  p-2 rounded-sm text-xl outline-none  ' onChange={(e)=> setInput(e.target.value)} value={input} />
            <button type="submit" className='text-lg  rounded-sm ml-3 p-2 bg-green-700 hover:bg-green-800 text-white active:scale-95  '
            >
              Add Todo
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddTodo;
