import { useState, useEffect } from "react";
import { NavBar, Logo, Search, NumResults } from "./NavBar";
import {
  Main,
  Box,
  WatchedMovieList,
  WatchedMovieSummary,
  MovieList,
} from "./Main";
import { Loader } from "./Loader";
import { tempMovieData, tempWatchedData } from "./tempMovieData";

/**
 * The `average` function calculates the average value of an array by summing all elements and dividing
 * by the array length.
 * @param arr - An array of numbers for which you want to calculate the average.
 */
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "3b0006a4";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = "batman";

  useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>
        <Box>
          <>
            <WatchedMovieSummary watched={watched} />
            <WatchedMovieList watched={watched} />
          </>
        </Box>
      </Main>
    </>
  );
}
