import { Route, Routes } from "react-router-dom"
import { IndexVentanaChat } from "./components/IndexVentanaChat"


function App() {


  return (
    <div className=" min-h-screen bg-zinc-950 text-white  " >
      <Routes>
        <Route path="/" element={<IndexVentanaChat />} />
      </Routes>


    </div>
  )
}

export default App
