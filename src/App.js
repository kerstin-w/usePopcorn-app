import { NavBar, Logo, Search, NumResults } from "./NavBar";
import {
  Main,
  Box,
  WatchedMovieList,
  WatchedMovieSummary,
  MovieList,
} from "./Main";
import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./tempMovieData";

/**
 * The `average` function calculates the average value of an array by summing all elements and dividing
 * by the array length.
 * @param arr - An array of numbers for which you want to calculate the average.
 */
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          {" "}
          <>
            <WatchedMovieSummary watched={watched} />
            <WatchedMovieList watched={watched} />
          </>
        </Box>
      </Main>
    </>
  );
}
