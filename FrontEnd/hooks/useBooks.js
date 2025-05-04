import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { getBooks } from "../services/bookService"

export default function useBooks() {
  const [books, setBooks] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks()
        setBooks(data)
      } catch (error) {
        console.error("Erro ao carregar livros", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  return { books, loading }
}
