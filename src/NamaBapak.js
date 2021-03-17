import React, { useState } from "react";
import "./NamaBapak.css";
import ChildComponent from "./ChildComponent/ChildComponent";

export default function NamaBapak() {
  const [nameState, setNameState] = useState("Adam");

  return (
    <div className="parentComponent">
      <div className="wrapper">
        <br />
        <br />
        <h1>Hai !</h1>
        <h1>Nama Saya Habil</h1>
        <h1>
          Dan Nama Bapak Saya, <strong>{nameState}</strong>
        </h1>
        <ChildComponent
          onChange={(value) => {
            setNameState(value);
          }}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
