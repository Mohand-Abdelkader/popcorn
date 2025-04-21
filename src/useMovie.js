import { useEffect, useState } from "react";
const KEY = "10947c50";

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoadin] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovieData() {
        try {
          setIsLoadin(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            {
              signal: controller.signal,
            }
          );
          if (!res.ok)
            throw new Error("something went wrong with movie fetching");
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie Not Found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoadin(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovieData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
