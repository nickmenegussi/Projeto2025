import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { getBooks } from "../services/ServiceBook"

export default function useBooks() {
  const [booksComplementares, setBooksComplementares] = useState(null)
  const [booksBasicas, setBooksBasicas] = useState(null)
  const [books, setBooks] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const data = await getBooks()
        const allBooks = data;
        const booksLoans = allBooks.filter(
          (books) => books.bookCategory === "emprestimo"
        );
        const booksReserves = allBooks.filter(
          (books) => books.bookCategory === "reserva"
        )
        const booksComplementaresFiltered = allBooks.filter((books) => books.tagsBook === "Obras Complementares")
        const booksBasicasFiltered = allBooks.filter((books) => books.tagsBook === "Obras Básicas")
        setBooks({ booksLoans: booksLoans, booksReserves: booksReserves })
        setBooksComplementares(booksComplementaresFiltered)
        setBooksBasicas(booksBasicasFiltered)
      } catch (error) {
        console.error("Erro ao carregar livros", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  return { books, booksComplementares, booksBasicas ,loading }
}