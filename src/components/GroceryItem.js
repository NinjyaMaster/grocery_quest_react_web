import React from "react";
import { useParams, useLocation } from "react-router-dom";

const GroceryItem = (props) => {
  const { grocery, storeId } = props;
  const params = useParams();
  const location = useLocation();

//   console.log(`json ${JSON.stringify(params)}`);
   //console.log(`id ${params.id}`);
   console.log(`location : ${location.pathname}`);
   console.log(`location json : ${JSON.stringify(location)}`);

  //<div className="mail_id">{details.id}</div>

  const handleDeleteGroceryClick = () =>{
    console.log("&&&&& delete grocery", grocery.id)
  }

  return (
      <div className="store">
        <div className="name">{grocery.name}</div>
        <div className="id">{grocery.id}</div>
        <button onClick={handleDeleteGroceryClick}>Delete</button>
      </div>
  );
}

export default GroceryItem