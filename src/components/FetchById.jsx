import React, { useState } from "react";
import { useFetchByIdQuery } from "../services/todoApi";

export const FetchById = () => {

  const [id, setId] = useState("")
  const { data, isLoading, isError } = useFetchByIdQuery(id, {
    skip: id === "" 
  });

  return (
    <div>
      <form>
        <input 
          type="number" 
          placeholder="enter todo Id" className="border rounded-sm pl-1 outline-none"
          value={id}
          onChange={(e)=>setId(e.target.value)}
        />
      </form>

      {isLoading && <p>Loading.........</p>}
      {isError   && <p>Error fetching todo</p>}
      {data && (
        <div>
          <small>ID: {data.id}</small>
          <h2>{data.title}</h2>
        </div>
      ) }
    </div>
  );
};
