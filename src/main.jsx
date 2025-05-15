import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="818273501694-i1ht6sr96ndoc5lkfcmdk7j1fe1dvj3g.apps.googleusercontent.com"> */}
      <App />
    {/* </GoogleOAuthProvider> */}
  </StrictMode>,
)
