import { useSelector, useDispatch } from "react-redux";
import { completedTodo, removeTodo, updateTodo } from "../features/TodoSlice";
import { Circle, CircleCheckBig, Pen, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Sortable from "sortablejs"

const Todos = () => {

  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const containerRef = useRef(null)
  const [items , setItems] = useState(todos)
  console.log(todos);
  


  useEffect(()=>{
    const sortable = new Sortable(containerRef.current, {
      animation : 200,
      ghostClass: "opacity-50",
      onEnd: (evt)=>{
        setItems((prev) => {
          const updated = [...prev];
          const [moved] = updated.splice(evt.oldIndex, 1);
          updated.splice(evt.newIndex, 0, moved);
          return updated;
        });
      },
    });
    return () => sortable.destroy();
  },[])

  return (
    <>
      <div ref={containerRef} className="flex flex-col gap-3 justify-center ">
        { todos.slice().reverse().map((todo) => (
          <>
            <div
              className='flex justify-between items-center list-none gap-2 bg-gray-700 hover:bg-gray-800 text-white mx-4 md:mx-15  p-1 rounded-md relative min-w-20 transition-all duration-300 cursor-pointer ' key={todo.id} 
            >
              <div>
                <div onClick={()=> {dispatch(completedTodo(todo.id))}}>
                  {todo.completed ? (
                    < CircleCheckBig size={18} className="bg-green-300 rounded-full text-green-900" />
                    ):(
                    <Circle size={18}/>
                  )}
                </div>
              </div>
              <div className={`flex-1 pl-1 break-words overflow-hidden ${todo.completed ? 'line-through' : ''} `}>
                {todo.text }
              </div>

              <div className=" w-12 "  >
                <button 
                  className={`text-white p-1 rounded-sm  cursor-pointer active:scale-95 hover:text-sky-400 disabled:cursor-not-allowed disabled:opacity-30 `}
                  disabled = {todo.completed}
                  onClick={()=>{
                    const newText = prompt("Update todo:", todo.text);
                    if(newText && newText.trim()!== ""){
                      dispatch(updateTodo({ id: todo.id , text : newText}));
                    }
                  }}
                >
                  < Pen size={16} />
                </button>

                <button 
                  className=' hover:text-red-400 text-white p-1 rounded-sm  cursor-pointer active:scale-95 ' 
                  onClick={()=>dispatch(removeTodo(todo.id))} 
                >
                  <Trash  size={16}/>
                </button>
              </div>


            </div>
          </>
        )) }
      </div>
    </>
  );
};

export default Todos;

