import Todos from "./Todos";
import { LoadingText } from "./LoadingText";
import { useGetTodoQuery } from "../services/todoApi";


export const Container = () => {



  const { isSuccess, isLoading , isError, error } = useGetTodoQuery();
  
  if(isLoading) return (<LoadingText />);
  if(isError) return (
    <div className="text-center text-red-200 font-mono">
      {error.message}
    </div>
  );
  
  if(isSuccess) return (
    <div> 
     < Todos /> 
    </div>
  );
};
