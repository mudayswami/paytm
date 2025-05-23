import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import {SendMoney} from "./pages/SendMoney";
import './App.css';
function App() {

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<Home/>}></Route>
          <Route path="/sendmoney" element={<SendMoney/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
