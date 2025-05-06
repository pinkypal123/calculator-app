
import Display from './components/Display';
import Keypad from './components/Keypad';
import './App.css'; 
// import { useKeyboard } from './hooks/useKeyboard';
import { useEffect } from 'react';
function App() {
  // useEffect(()=>{
  //   useKeyboard()
  // },[])
 
  return (
    <>
    <div className="app">
      <div className="calculator">
      
      <Display />
      <Keypad  />
    </div>
    </div>
    </>
  )
}

export default App
