import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/ServicePost';

export default function usePostMessage(searchTerm = '') {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPosts(searchTerm);
        setPostData(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [searchTerm]);

  return { postData, setPostData, loading, error };
}
