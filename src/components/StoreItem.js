import React from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

const StoreItem = (props) => {
  const { store } = props;
  const params = useParams();
  const location = useLocation();

//   console.log(`json ${JSON.stringify(params)}`);
   console.log(`id ${params.id}`);
   console.log(`location : ${location.pathname}`);
   console.log(`location json : ${JSON.stringify(location)}`);

  //<div className="mail_id">{details.id}</div>

  return (
    <Link to={`${location.pathname}store/${store.id}/`}>
      <div className="store">
        <div className="name">{store.name}</div>
        <div className="id">{store.id}</div>
      </div>
    </Link>
  );
}

export default StoreItem