import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { getBooks } from "../services/bookService"

export default function useBooks() {
  const [books, setBooks] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const data = await getBooks()
        const allBooks = data;
        const booksLoans = allBooks.filter(
          (books) => books.bookCategory === "empréstimo"
        );
        const booksReserves = allBooks.filter(
          (books) => books.bookCategory === "reserva"
        )
      setBooks({ booksLoans: booksLoans, booksReserves: booksReserves });
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
