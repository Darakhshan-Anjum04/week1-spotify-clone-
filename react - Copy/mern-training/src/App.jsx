
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import Login from "./Login";
import './Login.css';
import './SignUpForm.css'; 
import axios from 'axios';
import formHandlers from './formHandlers'; 
import apiService from './apiService';
import registerUser  from './apiService';
axios.defaults.withCredentials = true;


export default function App(){
  return (
    <>
      <BrowserRouter>
          <Routes>
          <Route path="/SignUpForm"element={<SignUpForm/>}/>
          <Route path="/Login"element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}