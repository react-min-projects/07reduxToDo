import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/TodoSlice";
import { SquarePen, Trash2 } from "lucide-react";

const Todos = () => {

  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  return (
    <>
      { todos.map((todo) => (
        <div 
          className='flex justify-between list-none gap-5 bg-gray-900 text-white mx-20 mt-3 p-2 rounded-md relative min-w-32' key={todo.id} 
        >
          <div>
            {todo.text}
          </div>

          <div className="space-x-2" >
            <button 
            className='bg-sky-600 text-white p-1 rounded-sm  cursor-pointer active:scale-95' >
              < SquarePen size={16} />
            </button>

            <button 
              className='bg-red-600 text-white p-1 rounded-sm  cursor-pointer active:scale-95 ' 
              onClick={()=>dispatch(removeTodo(todo.id))} 
            >
              <Trash2  size={16}/>
            </button>
          </div>


        </div>
      )) }
    </>
  );
};

export default Todos;

