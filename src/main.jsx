import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import ScrollToTop from 'react-scroll-to-top'
import { FaChevronUp  } from "react-icons/fa";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <ScrollToTop smooth color='white' component=<FaChevronUp   className='text-white font-normal text-lg top-100 z-10' />  style={{backgroundColor: '#3882F6', display:'flex', alignItems:'center', justifyContent:'center'}}/>
    </ThemeProvider>
  </StrictMode>,
)
