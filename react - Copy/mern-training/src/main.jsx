import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import SignUpForm from "./SignUpForm";
import './SignUpForm.css'; 
import Login from "./Login";
import './Login.css';
import './apiService.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
