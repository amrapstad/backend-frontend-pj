import { useState } from 'react'
import * as React from 'react';
import './App.css'
import { Input } from '@base-ui/react/input';
import { Tabs } from '@base-ui/react/tabs';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isBoats, toggleBoatSearch] = useState('Boats')

  function handleTabChange(value) {
    setItems([])
    toggleBoatSearch(value)
  }

  
  // THIS IS THE API CALL FUNCTION THAT HANDLES FOR BOAT SEARCHES
  async function handleBoatSearch(keyword) {
    setError(null)
    setLoading(true)

    try {
      const url = keyword
        ? `/api/boats/search?keyword=${encodeURIComponent(keyword)}`
        : `/api/boats/search`

      const res = await fetch(url)

      if (!res.ok) {
        setError(await res.text())
        setItems([])
        return
      }

      setItems(await res.json())
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // THIS IS THE API CALL FUNCTION THAT HANDLES FOR OWNERS SEARCHES
  async function handleOwnerSearch(keyword) {
    setError(null)
    setLoading(true)

    try {
      const url = keyword
        ? `/api/owners/search?keyword=${encodeURIComponent(keyword)}`
        : `/api/owners/search`

      const res = await fetch(url)

      if (!res.ok) {
        setError(await res.text())
        setItems([])
        return
      }

      setItems(await res.json())
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Tabs.Root className="Tabs" defaultValue="Boats" onValueChange={(value) => handleTabChange(value)}>
        <Tabs.List className="List">
          <Tabs.Tab className="Tab" value="Boats">
            Boats
          </Tabs.Tab>
          <Tabs.Tab className="Tab" value="Owners">
            Owners
          </Tabs.Tab>
          <Tabs.Indicator className="Indicator" />
        </Tabs.List>
        <Tabs.Panel className="Panel" value="Boats">
          <h1>{isBoats}</h1>
        </Tabs.Panel>
        <Tabs.Panel className="Panel" value="Owners">
          <h1>{isBoats}</h1>
        </Tabs.Panel>
      </Tabs.Root>

      {/* SEARCHBAR*/}
      <Input
        placeholder={`Search for ${isBoats} and hit "Enter"`}
        className="inputClass"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isBoats == "Boats") 
            handleBoatSearch(inputValue)
          else if (e.key === 'Enter' && isBoats == "Owners") 
            handleOwnerSearch(inputValue)
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* SHOWN FOR BOATS*/}
      {isBoats === "Boats" && items.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.boatName}</h3>
          <p>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</p>
        </div>
      ))}

      {/* SHOWN FOR BOAT OWNERS*/}
      {isBoats === "Owners" && items.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.ownerName}</h3>
          <p>Mail: {item.email}</p>
        </div>
      ))}
    </>
  )
}




export default App