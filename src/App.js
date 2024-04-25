import { NavBar, Logo, Search, NumResults } from "./NavBar";
import { Main } from "./Main";
import { useState } from "react";
import { tempMovieData } from "./tempMovieData";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main movies={movies} />
    </>
  );
}
