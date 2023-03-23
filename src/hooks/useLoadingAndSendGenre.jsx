import { useState, useEffect } from "react";
import { useSearchStore } from '@/store/state';

export default function useLoadingAndSendGenre(category) {
  const [loading, setLoading] = useState(true);
  const filteredMovies = useSearchStore((state) => state.filteredMovies);
  const sendGenre = useSearchStore((state) => state.sendGenre);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
    sendGenre({ genre: category });
  }, [sendGenre, category]);

  return { loading, filteredMovies };
}