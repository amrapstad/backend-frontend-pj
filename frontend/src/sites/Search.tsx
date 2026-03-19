import { Input } from '@base-ui/react/input'
import styles from '../App.module.css'
import { Select } from '@base-ui/react/select';
import { useState, useEffect } from 'react'


const filter_search = [
  { label: 'Boats', value: 'Boats' },
  { label: 'Owners', value: 'Owners' },
];

export default function Search() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<string>('Boats')
  
  useEffect(() => {
    handleBoatSearch("")
  }, [])

  function handleModeChange(value: string) {
    setMode(value)
    setInputValue("")
    setItems([])
    if (value == "Boats") {
      handleBoatSearch("")
    }
    if (value == "Owners") {
      handleOwnerSearch("")
    }
  }

  async function handleBoatSearch(keyword: string) {
    setError(null)
    setLoading(true)
    try {
      const url = keyword
        ? `/api/boats/search?keyword=${encodeURIComponent(keyword)}`
        : `/api/boats/search`
      const res = await fetch(url)
      if (!res.ok) { setError(await res.text()); setItems([]); return }
      setItems(await res.json())
    } catch { setError('Something went wrong.') }
    finally { setLoading(false) }
  }

  async function handleOwnerSearch(keyword: string) {
    setError(null)
    setLoading(true)
    try {
      const url = keyword
        ? `/api/owners/search?keyword=${encodeURIComponent(keyword)}`
        : `/api/owners/search`
      const res = await fetch(url)
      if (!res.ok) { setError(await res.text()); setItems([]); return }
      setItems(await res.json())
    } catch { setError('Something went wrong.') }
    finally { setLoading(false) }
  }

  return (
    <>

    <div className={styles.Field}>
      <Select.Root items={filter_search} defaultValue="Boats" onValueChange={(value) => handleModeChange(value ?? 'Boats')}>
          <Select.Label className={styles.Label}>Select Search Type</Select.Label>
          <Select.Trigger className={styles.Select}>
          <Select.Value className={styles.Value} placeholder="Select search type" />
          <Select.Icon className={styles.SelectIcon}>
              <ChevronUpDownIcon />
          </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
          <Select.Positioner className={styles.Positioner} sideOffset={8}>
              <Select.Popup className={styles.Popup}>
              <Select.ScrollUpArrow className={styles.ScrollArrow} />
              <Select.List className={styles.List}>
                  {filter_search.map(({ label, value }) => (
                  <Select.Item key={label} value={value} className={styles.Item}>
                      <Select.ItemIndicator className={styles.ItemIndicator}>
                      <CheckIcon className={styles.ItemIndicatorIcon} />
                      </Select.ItemIndicator>
                      <Select.ItemText className={styles.ItemText}>{label}</Select.ItemText>
                  </Select.Item>
                  ))}
              </Select.List>
              <Select.ScrollDownArrow className={styles.ScrollArrow} />
              </Select.Popup>
          </Select.Positioner>
          </Select.Portal>
      </Select.Root>
    </div>
    
    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>} 

    <Input
        placeholder={`Search for ${mode} and hit "Enter"`}
        className={styles.inputClass}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && mode === 'Boats') handleBoatSearch(inputValue)
          else if (e.key === 'Enter' && mode === 'Owners') handleOwnerSearch(inputValue)
        }}
    />

    {mode === 'Boats' && items.map((item) => (
      <div className={styles.card} key={item.id}>
        <h3>{item.boatName}</h3>
        <p>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</p>
      </div>
    ))}
    
    {mode === 'Owners' && items.map((item) => (
      <div className={styles.card} key={item.id}>
        <h3>{item.ownerName}</h3>
        <p>Mail: {item.email}</p>
      </div>
    ))}
    </>
  )
}



function ChevronUpDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}