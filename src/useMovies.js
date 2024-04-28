import { useState, useEffect } from "react";

const KEY = "3b0006a4";

/**
 * The `useMovies` function fetches movie data based on a query using the OMDB API and manages loading
 * state and errors.
 * @param query - The `query` parameter in the `useMovies` function is used to search for movies based
 * on the user's input. It is the search term that is used to fetch movies from the OMDB API.
 * @returns The `useMovies` custom hook returns an object with three properties: `movies`, `isLoading`,
 * and `error`. These properties provide information about the state of the movie search operation. The
 * `movies` property contains an array of movie objects, `isLoading` indicates whether the search is
 * currently in progress, and `error` holds any error message encountered during the search process.
 */
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
