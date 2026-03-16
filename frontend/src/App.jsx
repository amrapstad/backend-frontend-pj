import { useState } from 'react'
import './App.css'
import { Input } from '@base-ui/react/input';


function App() {
  const [inputValue, setInputValue] = useState('')
  const [submitted, setSubmitted] = useState('')

  const currentItems = []

  function handleSearch(value) {
    setSubmitted(value)
  }

  return (
    <>
      <Input 
      placeholder='Search for titles and hit "Enter"'
      className="inputClass" 
      value={inputValue} onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if(e.key === 'Enter') {
          handleSearch(inputValue)}
        }
      }
      />

      {submitted && <p>You searched for "{submitted}"</p>}

      {currentItems.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}

    </>
  )
}

export default App
