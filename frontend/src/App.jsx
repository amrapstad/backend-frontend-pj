import { useState } from 'react'
import './App.css'
import { Input } from '@base-ui/react/input';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [boats, setBoats] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  

  async function handleSearch(keyword) {
    setError(null)
    setLoading(true)

    try {
      const url = keyword
        ? `/api/boats/search?keyword=${encodeURIComponent(keyword)}`
        : `/api/boats/search`

      const res = await fetch(url)

      if (!res.ok) {
        setError(await res.text())
        setBoats([])
        return
      }

      setBoats(await res.json())
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Input
        placeholder='Search for boats and hit "Enter"'
        className="inputClass"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch(inputValue)
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {boats.map((boat) => (
        <div className="card" key={boat.id}>
          <h3>{boat.boatName}</h3>
          <p>Purchased: {new Date(boat.purchaseDate).toLocaleDateString()}</p>
        </div>
      ))}
    </>
  )
}

export default App