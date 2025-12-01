import { useEffect } from "react";
import Todos from "./Todos";
import { LoadingText } from "./LoadingText";
import { useSelector, useDispatch } from "react-redux"; 
import { fetchTodo } from "../features/TodoSlice";


export const Container = () => {

  const { todos, loading, error } = useSelector(state=> state.todo);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchTodo())
  },[dispatch])

  
  if(loading) return (<LoadingText />);
  if(error) return (
    <div className="text-center text-red-200 font-mono">
      {error}
    </div>
  );
  
  return (
    <div> 
     < Todos /> 
    </div>
  );
};
