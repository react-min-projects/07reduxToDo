import React, {useState} from "react";
import { useDispatch } from 'react-redux'
import { addTodoAsync } from "../features/TodoSlice";


const AddTodo = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const handleAddTodo = (e)=>{
    e.preventDefault();

    if(input.length === 0){
      alert("To Do can't be empty")
      return
    }

    dispatch(addTodoAsync(input))

    setInput("");
  }

  return (
    <>
      <div className='relative text-center font-mono py-10 space-y-8'>
        <div>
          <h2 className='text-4xl sm:text-5xl font-bold text-white ' >
            To Do List
          </h2>
        </div> 
        <div className="flex justify-center">
          <form 
            onSubmit={handleAddTodo}
            className="flex justify-center border  border-dotted border-white rounded-md p-1"
          >

            <input type="text" placeholder='Enter a Todo..' className='text-white pl-1 sm:p-1 rounded-sm text-md sm:text-lg outline-none w-full min-w-44 ' onChange={(e)=> setInput(e.target.value)} value={input} />
            <button type="submit" className=' rounded-sm px-3  bg-green-700 hover:bg-green-800 text-white active:scale-95'
            >
              Add 
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default AddTodo;
