import { Circle, Check, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { useDelTodoMutation, useGetTodoQuery, useToggleTodoMutation, useUpdateTodoMutation } from "../services/todoApi";

const Todos = () => {

  const { data: todos } = useGetTodoQuery();

  const [updateTodo] = useUpdateTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [delTodo   ] = useDelTodoMutation();

  const [editingId , setEditingId] = useState(null);
  const [newText, setNewText] = useState("")
  
  const startEditing = (todo)=>{
    setEditingId(todo.id);
    setNewText(todo.title)
  }

  const save = ()=>{
    updateTodo({id : editingId , updatedTitle:  newText.trim()});
    setEditingId(null);
    setNewText("")
  }

  const handleToggle = (id , completed)=>{
    toggleTodo({id, completed});
  }

  const handleDel = (todoId) =>{
    delTodo(todoId);
  }

  return (
    <>
      <div className="flex flex-col gap-3 justify-center min-w-60 ">
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
                {editingId === todo.id ? (
                  <input
                    className="w-full bg-transparent outline-none border-b border-sky-400"
                    type="text" 
                    value={newText}
                    onChange={(e)=> setNewText(e.target.value)}
                    onBlur={save}
                    onKeyDown={(e)=> e.key === "Enter" && save()}
                  />
                ):(
                  todo.title
                )}
                
              </div>

              <div className=" w-12 "  >

                <button 
                  className={`text-white p-1 rounded-sm  cursor-pointer active:scale-95 hover:text-sky-400 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-white disabled:active:scale-100 `}
                  disabled = {todo.completed}
                  onClick={()=>startEditing(todo)}
                >
                  < Pen size={16} />
                </button>

                <button 
                  className=' hover:text-red-400 text-white p-1 rounded-sm  cursor-pointer active:scale-95 ' 
                  onClick={()=>handleDel(todo.id)} 
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

