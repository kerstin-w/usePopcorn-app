import { useState, useEffect } from "react";
import { NavBar, Logo, Search, NumResults } from "./NavBar";
import {
  Main,
  Box,
  WatchedMovieList,
  WatchedMovieSummary,
  MovieList,
  MovieDetails,
} from "./Main";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { tempMovieData, tempWatchedData } from "./tempMovieData";

/**
 * The `average` function calculates the average value of an array by summing all elements and dividing
 * by the array length.
 * @param arr - An array of numbers for which you want to calculate the average.
 */
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "3b0006a4";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
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
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
              />
            ) : (
              <>
                <WatchedMovieSummary watched={watched} />
                <WatchedMovieList watched={watched} />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
