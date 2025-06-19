import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='search-bar' >
      <input
        className='search-bar-input'
        type="text"
        placeholder="Enter city or zip code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className='search-bar-button'>
        Search
      </button>
    </form>
  )
}

export default SearchBar