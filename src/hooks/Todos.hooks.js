import React, { useState, useEffect } from 'react'

const useFetch = (API_URL) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        const response = await fetch(API_URL)
        const listItems = await response.json()
        console.log(listItems)
        setItems(listItems)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    ;(async () => await fetchItems())()
  }, [])
}

export { useFetch }
