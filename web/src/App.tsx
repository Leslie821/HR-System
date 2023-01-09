import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { NavbarNested } from "./components/sideBar/SideBar2";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarNested />
    </>
  );
}

export default App;
