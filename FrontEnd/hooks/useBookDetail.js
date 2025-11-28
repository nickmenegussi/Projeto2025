import React, { useCallback, useEffect, useState } from "react";
import { getBookById } from "../services/ServiceBook";
import handleApiError from "../utils/handleApiError";

export default function useBookDetail(bookId) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchBooks = useCallback(async () => {
    if (!bookId) {
      return;
    }
    setLoading(true);
    try {
      const books = await getBookById(bookId);
      setBook(books);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [bookId])

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { book, loading}
}
