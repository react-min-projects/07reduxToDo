import { useSelector, useDispatch } from "react-redux";
import { completedTodo, deleteTodo, toggleTodo, updateTodo } from "../features/TodoSlice";
import { Circle, Check, Pen, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Todos = () => {

  const {todos , loading , error} = useSelector(state => state.todo);
  
  const dispatch = useDispatch()
  const containerRef = useRef(null)

  const handleUpdate = (id, newText)=>{
    dispatch(updateTodo({ id: id , updatedTitle : newText}))
  }

  const handleToggle = (id , completed)=>{
    dispatch(toggleTodo({id, completed}));
  }


  return (
    <>
      <div ref={containerRef} className="flex flex-col gap-3 justify-center min-w-60 ">
        { todos.slice().reverse().map((todo) => (
            <div
              className='flex justify-between items-center list-none gap-2 bg-gray-700 hover:bg-gray-800 text-white mx-4 md:mx-15  p-1 rounded-md relative  transition-all duration-300 cursor-pointer ' key={todo.id} 
            >
              <div>
                <div onClick={()=>handleToggle(todo.id, todo.completed)}>
                  <div className="relative flex items-center justify-center">
                    <Circle
                      size={22}
                      className={`text-gray-500 ${todo.completed ? 'text-green-300' : ''}`} 
                    />

                    {todo.completed && (
                      <Check
                        size={14}
                        className="absolute  text-green-900 bg-green-300 rounded-full p-[2px] transition-transform duration-300 scale-100"
                        style={{ transform: todo.completed ? "scale(1.2)" : "scale(0)" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={`flex-1 pl-1 break-words overflow-hidden ${todo.completed ? 'line-through' : ''} `}>
                {todo.title }
              </div>

              <div className=" w-12 "  >
                <button 
                  className={`text-white p-1 rounded-sm  cursor-pointer active:scale-95 hover:text-sky-400 disabled:cursor-not-allowed disabled:opacity-30 `}
                  disabled = {todo.completed}
                  onClick={()=>{
                    const newText = prompt("Update todo:", todo.title);
                    if(newText && newText.trim()!== ""){handleUpdate(todo.id, newText)}
                  }}
                >
                  < Pen size={16} />
                </button>

                <button 
                  className=' hover:text-red-400 text-white p-1 rounded-sm  cursor-pointer active:scale-95 ' 
                  onClick={()=>dispatch(deleteTodo(todo.id))} 
                >
                  <Trash  size={16}/>
                </button>
              </div>


            </div>
        )) }
      </div>
    </>
  );
};

export default Todos;

