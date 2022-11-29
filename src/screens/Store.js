import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
//import { useCookies } from "react-cookie";
//import Navbar from "../components/Navbar.js";
import Button from "../components/Button.js";

const  Store = (props) =>  {
  //const [store, setStore] = useState({});
  //const params = useParams();
  const { store } = props; // this works too
  console.log("&&&&&&&&",store);

  //const location = useLocation();

  //   console.log(`json ${JSON.stringify(params)}`);
  //   console.log(`id ${params.id}`);
  //   console.log(`location : ${location.pathname}`);
  //   console.log(`location json : ${JSON.stringify(location)}`);


  function handleDeleteClick() {
    // remove(`api/mail/${params.id}/`)
    //   .then((data) => {
    //     console.log(data);
    //     window.location.href = "/mail/inbox/";
    //   })
    //   .catch((error) => {
    //     console.log(`something is wrong ${error}`);
    //   });
  }

  function handleArchiveClick() {
    // const newMail = { ...mail, archived: true };
    // put(`api/mail/${params.id}/`, newMail)
    //   .then((data) => {
    //     console.log(data);
    //     window.location.href = "/mail/inbox/";
    //   })
    //   .catch((error) => {
    //     console.log(`something is wrong ${error}`);
    //   });
  }

  return (
    <div className="mailDetail">
      <h1 className="subject">store.name</h1>
      <div className="senderInfo">
        <p className="sender">store.id</p>
      </div>
      <p className="body">store.name</p>
      <Button className="buttonInactive" onClick={handleDeleteClick}>
        Delete
      </Button>
      <Button onClick={handleArchiveClick} className="buttonInactive">
        Archive
      </Button>
    </div>
  );
}

export default Store