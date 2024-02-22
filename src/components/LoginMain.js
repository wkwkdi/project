import React, { useState } from "react";
import Agree from "./Agree";
import Login from "./Login";

function LoginMain() {
  const [items, setItems] = useState(false);
  return <>{items ? <Agree /> : <Login setItems={setItems} />}</>;
}

export default LoginMain;
