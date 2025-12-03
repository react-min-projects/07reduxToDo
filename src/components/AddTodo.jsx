import { useState } from "react";
import { useAddTodoMutation } from "../services/todoApi";
import { FetchById } from "./FetchById";
import { Spinner } from "./LoadingText";


const AddTodo = () => {
  const [input, setInput] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  
  const [AddTodo, {isLoading}] = useAddTodoMutation();

  
  const alert = ()=>{
    setShowAlert(true);
    setTimeout(()=>{ setShowAlert(false)}, 2000);
  } 
  const handleAddTodo = (e)=>{
    e.preventDefault();

    setShowAlert(false);
    if(input.length === 0) return alert();

    AddTodo(input)

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
        <div>
          <div className="flex justify-center">
            <form 
              onSubmit={handleAddTodo}
              className="flex justify-center border  border-dotted border-white rounded-md p-1"
            >

              <input type="text" placeholder='Enter a Todo..' className='text-white pl-1 sm:p-1 rounded-sm text-md sm:text-lg outline-none w-full min-w-44 ' onChange={(e)=> setInput(e.target.value)} value={input} />
              <button type="submit" className=' rounded-sm px-3  bg-green-700 hover:bg-green-800 text-white '
                disabled={isLoading}
              >
                { isLoading ? <Spinner /> : "Add" } 
              </button>

            </form>
          </div>
          <div className="h-1">
            {showAlert && <span className="text-sm text-red-400" >Can't add empty Todo</span> } 
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTodo;
